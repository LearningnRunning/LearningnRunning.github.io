---
layout: post
title:  "카카오맵 리뷰데이터 분석으로 음식점 랭킹화"
date:   2024-11-29 09:09:09 +0900
categories: [data-analytics]
description: >
  머먹(What2Eat) 리뷰 데이터 분석: 기존 방식과 업그레이드된 평가 방식
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/af0f1268-fc4a-4aad-a4c5-48015c8cd151/image.jpeg
---


머먹(What2Eat)의 핵심은 단순히 음식점의 평점을 숫자로만 평가하지 않고, 리뷰어 개개인의 기준에서 리뷰를 해석하여 보다 신뢰도 높은 음식점 랭킹을 제공하는 데 있습니다. 

![](https://velog.velcdn.com/images/sungrok7/post/cdcf8e8b-6edb-4cb8-abb6-e616609c3cfc/image.jpeg)


기존 평가 방식과 이를 업그레이드하게 된 배경, 그리고 문제 해결 과정에서 적용한 새로운 접근법을 공유합니다.

---

# **1. 기존 평가 방식: 리뷰어 기준의 만족도 계산**
머먹의 기본 아이디어는 "평점은 단순히 숫자가 아니라, 리뷰어 개인의 기준에서 평가해야 한다"는 것이었습니다. 이를 위해 다음과 같은 방식으로 음식점을 평가했습니다:

![](https://velog.velcdn.com/images/sungrok7/post/220e7ccb-e89a-4a3c-9677-1a83cfd6a1ea/image.jpeg)

1. **리뷰어 기준의 만족과 불만족 정의**:
   - 리뷰어 평균 평점(`reviewer_avg`)을 기준으로, 
     - **1.5배 높은 평점**을 남겼을 경우 → "만족"
     - **1.5배 낮은 평점**을 남겼을 경우 → "불만족"
   - 이 기준을 통해 각 음식점에 대해 **만족 리뷰 수**와 **불만족 리뷰 수**를 계산했습니다.

2. **만족도 기반 음식점 평가**:
   - 음식점마다 **만족 리뷰 수 / 총 리뷰 수**를 계산해 정렬하여 랭킹화.
   - 추가적으로, 불만족 비율이 20% 이상인 경우 "🚨 불호주의 퍼센트"로 경고 표시.

## **기존 방식의 장점**
- 간단하고 직관적인 계산으로 음식점의 긍정적 평가를 파악할 수 있었음.
- "🚨 불호주의"로 유명한 음식점이지만 불호 요소를 조심하라는 정보 제공.

---

# **2. 기존 방식의 문제점**
기존 평가 방식은 단순하고 직관적이었지만, 다음과 같은 문제점이 있었습니다:

## **문제점 1: 리뷰어별 성향의 차이 반영 부족**
- 어떤 리뷰어는 어쩌다 한번 남겼고, 어떤 리뷰어는 열정적으로 찾아다니며 남긴 평점이 같은 수치로 적용됨.

## **문제점 2: 리뷰의 최신성 미반영**
- 5년 전에 남겨진 리뷰와 최근 3개월 내에 남겨진 리뷰가 동일한 비중으로 계산되었기 때문에, 현재 상태를 정확히 반영하지 못했습니다.

---

# **3. 업그레이드된 평가 방식**
이 문제를 해결하기 위해 두 가지 새로운 요소를 도입했습니다: **리뷰어 활동 레벨 가중치**와 **리뷰 작성 날짜 가중치**.

---

## **1) 리뷰어 활동 레벨 가중치**
리뷰어마다 카카오맵에서 제공하는 `badge_level`을 활용했습니다.  
![](https://velog.velcdn.com/images/sungrok7/post/a6192037-a3ea-4a6f-95ef-8a09d54247ec/image.jpeg)

### **a). 배지(Badge)의 등급(Grade)과 레벨(Level) 소개**
- **카카오맵 배지 서비스**는 **2023년 5월 9일**부터 공개된 서비스로, 사용자가 지도에서 활동을 통해 점수를 쌓으면 레벨과 배지가 부여됩니다.
- **레벨(Level)**:
  - 1부터 100까지 총 100개의 등급으로 구성.
  - 활동량에 따라 점수가 누적되어 레벨이 상승.
- **등급(Grade)**:
  - 브론즈 → 실버 → 골드 → 블루 → 퍼플 순으로 5개의 등급이 존재.
  - 퍼플이 가장 높은 등급으로, 활동량이 많고 검증된 사용자를 나타냄.

---

- **후기 작성, 장소 제안, 즐겨찾기 그룹 생성** 등의 활동 데이터를 기반으로 배지 레벨을 부여하기 때문에, 크롤링으로 가져오는 단순 평점 데이터와 비교했을 때 다음과 같은 **검증된 신뢰성**을 제공합니다.

### **적용 방식**

#### **배지 레벨**
- `badge_level`이 높을수록 해당 리뷰어의 평점(`reviewer_review_score`)에 더 높은 가중치를 부여.
- 비대칭적인 분포를 반영하기 위해 **로그 스케일링(Logarithmic Scaling)** 방식으로 정규화:
  ```python
  badge_level_norm = np.log1p(row["badge_level"]) / np.log1p(100)
  ```
- 이렇게 계산된 `badge_level_norm`을 리뷰 점수에 가중치로 반영.

#### **배지 등급**
- 배지 등급별 가중치를 정하여 적용
  ```python
  # 배지(Badge)에 따른 가중치
  badge_grade_weights = {
      "브론즈": 1.0,    # 활동량이 적음
      "실버": 1.2,      # 활동량이 중간 정도
      "골드": 1.5,      # 활동량이 높은 수준
      "블루": 2.0,      # 상위 활동 등급
      "퍼플": 3.0       # 가장 높은 활동 등급
  }

  badge_weight = badge_grade_weights.get(row["badge_grade"], 1.0)
  ```
---

## **2) 리뷰 작성 날짜 가중치**
리뷰의 최신성을 반영하기 위해 리뷰 작성 날짜(`reviewer_review_date`)에 가중치를 부여했습니다.
![](https://velog.velcdn.com/images/sungrok7/post/fe9f3307-b128-455f-8a90-636ab589d146/image.jpeg)

### **적용 방식**
- 최신 리뷰일수록 더 높은 가중치를, 오래된 리뷰일수록 낮은 가중치를 부여.
- 날짜 가중치를 계산하는 함수:
  
  ```python
  date_weight = max(1 - (today - row["reviewer_review_date"]).days / 90, 0)
  ```

- 기준:
  - 3개월 이내(90일)의 리뷰 → 가중치 1
  - 3개월 이후 → 날짜가 멀어질수록 가중치 감소, 최대 0까지.
  
### **a) 3개월 이내를 동일하게 가중치 1로 한 이유(미슐랭 가이드)** 
미슐랭 가이드는 심사의 일관성을 보장하기 위해 1년에 5~6회 이상 음식점을 방문하며 평가를 진행합니다. 이는 특정 시점의 리뷰나 경험에 의존하지 않고, 시간이 지나도 음식점의 서비스와 음식 퀄리티가 일관성을 유지하는지를 보는 데 중점을 둡니다.
#### **일관성이 3개월은 유지될 것으로 판단**
- 미슐랭 심사에서는 단기적인 변화를 크게 반영하지 않습니다. 따라서 2~3개월 내의 변화는 안정적이라고 간주합니다.
- 이를 바탕으로, 최근 3개월 이내의 리뷰는 동일한 가중치(최대 가중치 1)를 부여하기로 결정했습니다.

#### **오래된 리뷰 처리**
- 3개월 이후의 리뷰는 중요도가 점차 감소할 수 있도록 가중치를 낮췄습니다.
- 오래된 리뷰는 현재 음식점의 상태를 반영하지 못할 가능성이 높기 때문입니다.

---

## **3) 개선된 리뷰 점수 계산**
리뷰어 활동 레벨과 리뷰 작성 날짜를 반영하여 최종적으로 가중치가 적용된 점수를 계산했습니다:
![](https://velog.velcdn.com/images/sungrok7/post/6c1ae4eb-e7c1-442b-af94-f829ccb41da6/image.jpeg)

```python
def calculate_weighted_score(row, today=current_date, alpha=0.7):
    badge_level_norm = np.log1p(row["badge_level"]) / np.log1p(100)
    days_diff = (today - row["reviewer_review_date"]).days
    date_weight = max(1 - days_diff / 90, 0)
    weighted_score = row["reviewer_review_score"] * (1 + alpha * badge_level_norm) * date_weight
    return weighted_score
```

---

# **4. 랭킹 계산**
업그레이드된 리뷰 점수를 기반으로 음식점 랭킹을 다시 계산했습니다:

![](https://velog.velcdn.com/images/sungrok7/post/fdf31573-7063-4250-9e2c-94a67362fcad/image.jpeg)

## **1) 음식점별 가중치 평균 및 합계 계산**
각 음식점에 대해 가중치가 적용된 리뷰 점수(`weighted_score`)의 평균과 합계를 계산한 후에 혼합 지표 생성하였습니다. 리뷰 개수가 단순히 많을 곳과 리뷰 개수가 적지면 좋은 점수로 분포한 것을 고루 반영하기 위함입니다. 

```python
# Step 1: 평균과 합계 계산
weighted_scores = (
    review.groupby("diner_idx")
    .agg(weighted_avg_score=("weighted_review_score", "mean"),
         weighted_sum_score=("weighted_review_score", "sum"))
    .reset_index()
)

# Step 2: 혼합 지표 생성
alpha, beta = 0.7, 0.3  # 평균과 합계의 중요도 비율
weighted_scores["combined_score"] = (
    alpha * weighted_scores["weighted_avg_score"] +
    beta * weighted_scores["weighted_sum_score"]
)

```

## **2) 음식점 데이터와 병합**
`diner_df`와 병합하여 최종적으로 음식점별 랭킹을 산출

```python
ranked_diner_df = diner_df.merge(weighted_scores, on="diner_idx", how="left")

# Step 3: 혼합 지표를 기준으로 랭킹 매기기
ranked_diner_df["rank"] = ranked_diner_df["weighted_avg_score"].rank(ascending=False)
```

## **3) 결과**
- `weighted_avg_score`(평균 점수)와 `weighted_sum_score`(총 점수)를 기준으로 정렬된 음식점 랭킹을 얻음.
- 각 음식점의 "불호주의 퍼센트"도 유지하여 불만족 리뷰가 높은 음식점을 경고로 표시.
![](https://velog.velcdn.com/images/sungrok7/post/9563e945-1a03-4f4b-ba2f-7b10e25a11ce/image.jpeg)

---

# **5. 결론**
이번 업그레이드를 통해 머먹(What2Eat)은 다음과 같은 개선점을 이뤄냈습니다:
1. **리뷰어 신뢰도 반영**: `badge_level`을 활용해 리뷰어의 활동량에 따라 평점의 중요도를 조정.
2. **리뷰 최신성 강화**: 리뷰 작성 날짜를 반영해 현재 상태와 더 일치하는 랭킹 산출.
3. **정확성과 신뢰도 향상**: 단순히 리뷰 개수와 평점 평균에 의존하지 않고, 가중치를 기반으로 더 정교한 분석 가능.

---

### **현실 테스트: 강원도 속초에서의 머먹 활용**
업그레이드된 머먹으로 강원도 속초에서 직접 테스트할 기회가 있었습니다. 토요일 점심, 저녁, 야식, 그리고 일요일 아침 겸 점심으로 찾아갈 식당들을 머먹으로 정해 방문해 보았습니다.

#### **머먹 테스트 결과**
1. **토요일 점심**: 미리 찾아놓은 '산채가'라는 집은 영업시간이 아니어서 방문하지 못했습니다. 
2. **토요일 저녁**: '치커리생구이'라는 로컬 맛집에 방문했습니다. 이곳은 아파트 밀집 지역 한가운데에 위치한 곳으로, 진정한 로컬 맛집의 느낌을 물씬 풍겼습니다.
   - **결과**: 대만족! 웨이팅이 약 30분 있었지만, 여태 먹어본 소고기 중 가장 맛있다고 느낄 정도로 만족스러웠습니다.

3. **토요일 야식**: 야식으로 포장해간 썬활어에서 요즘 제철이라는 쥐치를 포장해갔습니다. 가격도 다 적혀있고 로컬 맛집이라 중앙시장에서 바가지 씌일까봐 걱정할 게 없어서 좋았습니다. 
4. **일요일 아침 겸 점심**: 속초에서의 마지막 식사를 머먹으로 추천받은 김정옥할머니순두부 본점에서 마무리하였습니다.
![](https://velog.velcdn.com/images/sungrok7/post/7c02d42a-acd0-49a3-b57c-cae5b5685bdf/image.jpg)

#### **머먹의 강점 확인**
머먹이 추천한 음식점들은 단순히 높은 평점만을 기준으로 선정된 것이 아니라, **리뷰어의 활동 레벨과 최신 리뷰의 신뢰도**를 반영한 결과였습니다. 특히 관광지 음식점은 리뷰 알바와 같은 부정확한 평점 데이터가 더 많을 수 있는데, 머먹은 진짜로 만족한 리뷰어와 **맛집 경험이 많은 '맛잘알' 리뷰어**의 최근 평가를 기준으로 식당을 추천했기 때문에 더 높은 만족도를 경험할 수 있었습니다.

---

### **마무리**
머먹(What2Eat)은 이번 업그레이드를 통해 더 신뢰도 높은 음식점 정보를 제공할 수 있는 강력한 도구로 거듭났습니다. 실제 테스트에서도 성공적인 결과를 확인하며, 앞으로 더 많은 사용자들이 머먹을 활용해 자신만의 맛집을 찾아갈 수 있을 것으로 기대됩니다.
머먹은 데이터 기반의 정교한 분석을 통해 사용자의 만족도를 높이는 것을 목표로 합니다. 앞으로도 다양한 데이터를 활용해 지속적으로 발전해 나갈 예정이며, 여행지에서뿐만 아니라 일상 속에서도 여러분의 든든한 맛집 탐방 동반자가 되길 바랍니다! 😊

![](https://github.com/LearningnRunning/What2Eat/blob/main/static/img/what2eat-word-small.png?raw=true)
[오늘머먹?](https://what2eat-chat.streamlit.app/) 현재 서울, 강원도 속초-강릉 지역에서 서비스 중입니다. 

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/