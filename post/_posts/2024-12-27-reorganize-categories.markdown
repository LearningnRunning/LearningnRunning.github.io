---
layout: post
title:  "ML활용을 위한 카카오맵 음식점 카테고리 재배치"
date:   2024-12-27 09:09:09 +0900
categories: Tech review
description: >
  ML활용을 위한 카카오맵 데이터 조정
image: 
  path: https://i.pinimg.com/736x/6e/55/b6/6e55b6b3ee079fcba14a5c7bdbc1e5b9.jpg
---



개인화 음식점 추천 시스템을 구축하기 위해, GNN 기반 모델을 활용하여 사용자의 취향에 맞는 음식을 추천하려고 합니다. 이를 위해 첫 번째로 활용할 데이터는 음식점의 카테고리 데이터입니다. 하지만 카카오맵의 음식점 카테고리에는 프랜차이즈명과 같은 희소한 데이터가 소분류에 다수 포함되어 있어, 이대로 학습을 진행하면 모델 성능에 부정적인 영향을 미칠 가능성이 있습니다. 따라서 이러한 희소한 데이터를 조정하고, 더 나아가 음식점 유형별 데이터의 불균형 문제도 해결하려고 합니다. 이를 위해 데이터를 재배치, 통합, 그리고 분류하는 작업을 진행합니다. 이러한 데이터 전처리 과정을 통해 카테고리 데이터를 더 효과적으로 학습에 활용할 수 있는 기반을 마련하려고 합니다.

---

## 개요
카테고리는 **대분류**, **중분류**, **소분류**, **세부 분류**로 구성되어 있으며, 음식점 카테고리를 다음 3단계로 재구성합니다:
1. **diner_category_middle** (중분류)
2. **diner_category_small** (소분류)
3. **diner_category_detail** (세부 분류)

### 주요 목적
1. **프랜차이즈명 정리:** 
   - 기존 소분류(small)에 포함된 프랜차이즈명을 세부(detail)로 이동시켜, 소분류에는 실제 음식점 유형만 남기기.
2. **언밸런싱한 분포 조정:**
   - 특정 카테고리의 과도한 데이터 집중 현상을 완화하고, 각 카테고리가 고르게 분포될 수 있도록 조정.

---

### 1. 카테고리 하향 조정
특정 중분류(middle) 카테고리를 하위 단계로 이동하여 소분류(small)로 조정하고, 기존 소분류는 세부(detail)로 하향 조정합니다.

- **예시:**
  - **"뷔페/패밀리레스토랑"** → [패밀리레스토랑, 뷔페, 푸드코트]
  - 작업 내용:
    1. 기존 소분류(small) 값을 세부(detail)로 이동.
    2. 기존 중분류(middle) 값을 소분류(small)로 이동.
    3. 새로운 중분류(middle) 값을 생성하여 재배치.


```python
lowering_middle_categories = {
    "뷔페/패밀리레스토랑": ["패밀리레스토랑", "뷔페", "푸드코트"],
    "일식": ["철판요리"]
}

for after_category, befor_categories in lowering_middle_categories.items():
    # 0. 조정할 row 설정
    target_rows = diner_df["diner_category_middle"].isin(befor_categories)

    # 1. 원래 소분류를 세부 분류로 이동
    diner_df.loc[target_rows, "diner_category_detail"] = diner_df.loc[target_rows, "diner_category_small"]

    # 2. 기존 중분류를 소분류로 이동
    diner_df.loc[target_rows, "diner_category_small"] = diner_df.loc[target_rows, "diner_category_middle"]

    # 3. 중분류를 새로운 카테고리(after_category)로 변경
    diner_df.loc[target_rows, "diner_category_middle"] = after_category
```


---

### 2. 부분 카테고리 하향 조정
특정 조건에 맞는 카테고리만 선별적으로 하향 조정합니다. 이 과정에서는 데이터의 세밀한 조건부 필터링이 중요합니다.

- **예시:**
  - **"분식"** 카테고리 중 일부(예: "떡볶이")만 **"한식"**으로 조정.
  - 작업 내용:
    - "떡볶이" 항목을 필터링.
    - "한식" 소분류로 이동.
    - 나머지 "분식" 카테고리는 역시 한식의 소분류로 이동.
    - "패스트푸드" 내에 있던 "샌드위치"를 양식의 소분류로 이동.
    - 나머지 "패스트푸드"와 "샐러드" 카테고리는 양식의 소분류로 이동.


```python
partly_lowering_middle_categories = {
    "한식": {
        "lowering_middle_categories": ["분식", "샤브샤브", "기사식당", "구내식당", "도시락"],
        "partly_lowering_middle_category": "분식",
        "partly_lowering_small_categories": ["떡볶이"]
    },
    "양식": {
        "lowering_middle_categories": ["패스트푸드", "샐러드"],
        "partly_lowering_middle_category": "패스트푸드",
        "partly_lowering_small_categories": ["샌드위치"]
    }
}

for after_category, category_info in partly_lowering_middle_categories.items():
    befor_categories = category_info["lowering_middle_categories"]
    part_middle_category = category_info["partly_lowering_middle_category"]
    part_small_categories = category_info["partly_lowering_small_categories"]

    # 조건 1. 특정 소분류를 새로운 중분류로 이동
    update_condition = (diner_df["diner_category_middle"] == part_middle_category) & (
        diner_df["diner_category_small"].isin(part_small_categories)
    )
    diner_df.loc[update_condition, "diner_category_middle"] = after_category

    # 조건 2. 나머지 소분류는 세부 분류로 이동
    target_rows = diner_df["diner_category_middle"].isin(befor_categories)
    diner_df.loc[target_rows, "diner_category_detail"] = diner_df.loc[target_rows, "diner_category_small"]
    diner_df.loc[target_rows, "diner_category_small"] = diner_df.loc[target_rows, "diner_category_middle"]
    diner_df.loc[target_rows, "diner_category_middle"] = after_category
```

---

### 3. 동일 레벨 내 카테고리 재분류 (치킨 카테고리 사례)
**치킨** 카테고리는 기존에 중분류(middle)로 설정되어 있었으며, 해당 소분류(small)에는 주로 프랜차이즈명이 포함되어 있었습니다. 프랜차이즈가 입력되지 않은 경우에는 null 값으로 표시되어 있었기에, 아래와 같은 재배치를 진행했습니다:

- 작업 내용:
  1. 기존 소분류(small) 값을 세부(detail)로 하향 조정하여 프랜차이즈명을 세부 분류로 이동.
  2. 새로운 소분류(small)를 생성하여 **치킨/프라이드**과 **치킨/구이**으로 세분화.
  3. 치킨의 중분류(middle)와 소분류(small), 세부(detail) 간의 관계를 새롭게 설정.
  4. 소분류의 재편성의 방법으로 비교적 소수인 치킨/구이의 프랜차이즈명을 수집하여, 해당 프랜차이즈 외에는 치킨/프라이드로 분류.
     5. 해당 방법이 다소 하드하기에 다른 방법론이 필요.
     6. 구운치킨, 프라이드 모두 파는 곳에 대한 멀티 소분류 고려.


```python
chiken_category = {
    "치킨/구이": [
        "지코바", "계림원", "굽네치킨", "오븐마루치킨", "화신바베큐치킨",  # 이하 생략
    ]
}

# 기존 중분류가 "치킨"인 경우 처리
target_categories = ["치킨"]
target_rows = (diner_df["diner_category_middle"].isin(target_categories)) & (~diner_df["diner_category_small"].isin(['프라이드치킨', '구운치킨']))

# 1. 소분류 값을 세부 분류로 이동
diner_df.loc[target_rows, "diner_category_detail"] = diner_df.loc[target_rows, "diner_category_small"]

# 2. 소분류를 "구운치킨"과 "프라이드치킨"으로 재구분
grilled_chicken = chiken_category["치킨/구이"]
diner_df.loc[target_rows & diner_df["diner_category_small"].isin(grilled_chicken), "diner_category_small"] = "구운치킨"
diner_df.loc[target_rows & ~diner_df["diner_category_small"].isin(grilled_chicken), "diner_category_small"] = "프라이드치킨"
```

---

### 4. 카테고리 상향 및 재배치
필요에 따라 하위 카테고리를 상위 단계로 올려 구조를 재배치합니다.

- **작업 내용:**
  1. 소분류(small)를 중분류(middle)로 상향 조정.
  2. 세부(detail)를 소분류(small)로 상향 조정.
  3. 상향된 카테고리와 기존 상위 카테고리 간의 일관성 유지.
     4. "한식"의 소분류였던 "육류,고기", "해물,생선"을 중분류로 조정.
     5. 한,중,일,양식을 고려하는 만큼 "고기 먹을래, 회 먹을래?" 고려 대상임을 참조.


```python
upper_replacing_small_categories = {
    "육류,고기": {
        "replacing_categories": {
            "돼지고기": [
                "흑다돈", "정가대박집", "서래갈매기", "쟁반집8292", "신마포갈매기", "고기싸롱", "엉터리생고기", 
                "목구멍", "식껍", "고기극찬", "원조부안집", "고반식당", "맛찬들왕소금구이", "삼산회관", 
                "고돼지", "미진축산", '삼겹살'
            ],
            "소고기,육회": [
                "보리네생고깃간", "착한고기", "이차돌", "한마음정육식당", "논골집", "돌배기집", "차돌풍", 
                "육칠이", "본가", "목우촌웰빙마을", "육회지존", "무쏘", "그램그램", "김형제고기의철학"
            ],
            "불고기,두루치기": ["새마을식당"]
        },
        
    },
    '해물,생선' : {
        'replacing_categories': {
            '회' : ['동원참치', '오징어나라'],
            '찜,조림,볶음' : ['아구', '김영희강남동태찜', '어부네코다리조림', '황금코다리', '김명자낙지마당', '마린보이코다리1번가'],
            '매운탕,해물탕' : ['바다양푼이동태탕', '연안식당'],
        }
    }
}

for target_category, category_info in upper_replacing_small_categories.items():
    replacing_categories = category_info['replacing_categories']
    
    # 1. diner_category_detail 값이 meat_category의 value에 있으면 key값으로 변경
    for key, values in replacing_categories.items():
        diner_df.loc[diner_df["diner_category_detail"].isin(values), "diner_category_detail"] = key

    # 2. diner_category_small이 '육류,고기'인 경우 값 올리기
    target_rows = diner_df["diner_category_small"].isin([target_category])

    # diner_category_middle로 값 올리기
    diner_df.loc[target_rows, "diner_category_middle"] = diner_df.loc[target_rows, "diner_category_small"]

    # diner_category_small에 diner_category_detail 값 올리기
    diner_df.loc[target_rows, "diner_category_small"] = diner_df.loc[target_rows, "diner_category_detail"]

```


---

### 5. 이중 하향 조정
특정 브랜드나 매장 데이터를 두 단계 아래로 조정하여 상세화합니다.

- **예시:**
  - 브랜드 매장의 경우:
    - **중분류:** "패스트푸드"
    - → 소분류(small): "햄버거"
    - → 세부(detail): "맥도날드"
  - 작업 내용:
    - 특정 매장을 세부(detail)로 하향 이동.
    - 관련된 소분류(small)와 중분류(middle)와의 연결성을 유지를 위해 업데이트.


```python
down_category = {
    '찜,조림,볶음': ['오봉집', '해탄'],
    '곱창,막창' : ['승도리네 곱도리탕'],
    '불고기,두루치기' : ['제육의법칙'],
    '퓨전일식' : ['아비꼬', '코코이찌방야'],
    '퓨전중식' : ["니뽕내뽕"],
    '퓨전한식' : ["돼지게티"],
    "돈까스,우동" : ["백소정", '토끼정'],
    "철판요리" : ["타코비", '호시타코야끼'],
    '초밥,롤' : ['오니기리'],
    '일본식라면' : ['면식당'],
    '초콜릿,사탕' : ['초콜릿', '왕코미네탕후루', '황제탕후루'],
    '제과,베이커리' : ['도넛'],
    '외국간식' : ['비첸향'],
    '중국요리' : ['탄탄면공방'],
    '이탈리안' : ['서가앤쿡', '파스토보이']
 }

for k,v in down_category.items():
    target_categories = v
    target_rows = diner_df["diner_category_small"].isin(target_categories)

    diner_df.loc[target_rows, "diner_category_detail"] = diner_df.loc[target_rows, "diner_category_small"]

    diner_df.loc[target_rows, "diner_category_small"] = k
    
    # middle 카테고리 재배치
    for c_middle, c_small_list in category_dict.items():
        if k in c_small_list:
            diner_df.loc[target_rows, "diner_category_middle"] = c_middle
```


---


### 앞으로 더 조정해야 하는 것

현재 카테고리 재배치 작업을 통해 많은 부분이 정리되었지만, 데이터의 효율성과 일관성을 높이기 위해 추가적으로 조정해야 할 사항들이 있습니다. 특히 **소분류 재조정**과 **멀티 소분류** 관련 조정이 필요합니다.

---

#### 1. **소분류 재조정**
**한식 소분류 내 유사한 항목 그룹화**  
한식 카테고리에서 아래 소분류들은 유사한 특징을 공유하므로 하나의 그룹으로 묶을 수 있습니다.  
이를 통해 데이터가 더 직관적이고 간소화될 수 있습니다.

- **한식 소분류:**  
  ['감자탕', '곰탕', '찌개,전골', '국밥', '해장국', '설렁탕']  
  - 이들은 모두 국물 요리라는 공통점을 가지고 있으며, 하나의 소분류로 묶는다면 예를 들어 **"국물요리"**라는 소분류를 생성할 수 있습니다.
  - 이를 통해 같은 종류의 메뉴를 제공하는 음식점을 묶어 검색의 편리성을 높일 수 있습니다.

---

#### 2. **멀티 소분류 or 넘나드는 세부분류**
**동시에 여러 소분류를 포함하는 음식점 처리**  
많은 음식점은 단일 메뉴를 제공하기보다는 다양한 메뉴를 조합하여 판매합니다. 현재 소분류 체계에서는 이 같은 다중 메뉴를 처리하기 어렵기 때문에 아래와 같은 조정이 필요합니다.

- **순대/국밥:**  
  대부분의 순대국밥 전문점은 **순대**와 **국밥**을 함께 판매합니다. 따라서 이를 하나의 멀티 소분류로 설정하거나, **순대국밥**과 같은 세부적인 분류를 새로 생성할 필요가 있습니다.
  
- **분식/순대:**  
  순대는 분식 메뉴로도 자주 분류됩니다. 예를 들어, 떡볶이와 순대를 함께 판매하는 분식점이 많습니다. 이러한 경우, **"분식 & 순대"**와 같은 멀티 소분류를 고려할 수 있습니다.
  
- **양식 소분류 내 멀티 메뉴:**  
  - **샌드위치와 샐러드**: 두 메뉴를 함께 판매하는 경우가 많으므로, 이를 단일 소분류로 묶거나 멀티 소분류를 생성할 수 있습니다.
  - **햄버거와 피자**: 이 둘은 패스트푸드로 묶일 수 있지만, 동시에 독립적인 카테고리로 남겨야 할 가능성도 고려해야 합니다.

- '샌드위치', '샐러드' → **['샌드위치', '샐러드']**  
- '햄버거', '피자', '패스트푸드' → **['햄버거', '피자', '패스트푸드']**  
- '멕시칸,브라질', '이탈리안', '스페인음식', '프랑스음식' → 각각의 독립적인 카테고리 유지  
- '스테이크,립', '해산물' → 그대로 유지

---

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/