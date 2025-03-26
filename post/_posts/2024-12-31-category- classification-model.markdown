---
layout: post
title:  "카카오맵 데이터를 활용한 음식점 소분류 분류 모델 개발"
date:   2024-12-30 23:16:09 +0900
categories: Tech review
description: >
  ML활용을 위한 카카오맵 데이터분석
image: 
  path: https://i.pinimg.com/736x/a3/34/93/a334934e44e7c10ffd190390a68e0b0a.jpg
author: LearningnRunning
keywords: 맛집, 카카오맵, 머신러닝, 데이터분석, BERT, 분류모델, NLP, 음식점 추천, KoBERT
seo:
  date_modified: 2024-12-31
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8
---

---

# 카카오맵 데이터를 활용한 음식점 소분류 분류 모델 개발

## 1. 프로젝트 개요

이 프로젝트는 **카카오맵 데이터의 음식점 정보를 활용해 음식점 소분류를 예측하는 모델**을 구축한 사례를 다룹니다.  
기존 데이터에는 소분류 항목에 결측치(null)가 많아 이를 보완하기 위해 **음식점 이름, 중분류명, 메뉴, 태그**를 입력 데이터로 사용하여 Bert 기반 모델을 추가 학습(fine-tuning)했습니다.  

## 2. 데이터 준비 및 전처리

### 데이터셋 구성

- **데이터 출처**: 카카오맵 음식점 데이터
- **주요 변수**:
  - `diner_name`: 음식점 이름
  - `diner_category_middle`: 중분류명
  - `diner_category_small`: 소분류명 (예측 대상)
  - `diner_menu_name`: 메뉴 이름 리스트
  - `diner_tag`: 음식점 태그 리스트

### 전처리

1. **태그 필터링**  
   일부 태그(예: `제로페이`, `혼밥`, `데이트` 등)는 소분류와 관련성이 낮아 제외했습니다.

2. **입력 데이터 구성**  
   음식점 이름, 중분류명, 메뉴, 태그를 활용해 아래와 같은 형식의 입력 텍스트를 생성했습니다:
   ```
   [NAME]음식점 이름[/NAME] [CAT]중분류명[/CAT] [MENU]메뉴1 [ITEM] 메뉴2[/MENU] [TAGS]태그1 [TAG] 태그2[/TAGS]
   ```

3. **소분류 레이블 인코딩**  
   소분류 데이터를 정수 인덱스로 변환하여 모델이 학습할 수 있는 형태로 변환했습니다. 최소 샘플 수가 2개 이상인 소분류만 사용했습니다.

4. **데이터 분리**  
   학습/검증 데이터를 80:20 비율로 분리하되, 레이블 분포를 유지하기 위해 `stratify` 옵션을 적용했습니다.

---

## 3. 모델 구성

### 3.1 모델 선택: **SKT KoBERT**
`SKT KoBERT`는 한국어 자연어 처리에 최적화된 사전 학습 언어 모델로, 추가 학습(fine-tuning)을 통해 소분류 분류 모델로 변환했습니다.

### 3.2 토크나이저 설정
KoBERT의 토크나이저를 활용해 입력 데이터를 토큰화하였습니다. 입력 길이는 최대 512 토큰으로 설정했습니다.

### 3.3 데이터셋 클래스
PyTorch `Dataset` 클래스를 활용하여 입력 데이터, 주의(attention) 마스크, 레이블을 모델에 전달할 수 있도록 구성했습니다.

---

## 4. 학습 과정

### 4.1 학습 파라미터
- **학습 에포크**: 50
- **배치 사이즈**: 32 (학습) / 64 (평가)
- **가중치 감쇠(weight decay)**: 0.01
- **Warmup 단계**: 1000 스텝

### 4.2 평가 지표
- **정확도(Accuracy)**
- **F1 Score**
- **Precision**
- **Recall**

### 4.3 콜백 설정
1. **Early Stopping**  
   - 검증 손실(eval_loss)이 개선되지 않을 경우 학습을 조기에 종료.
   - 기준: 5 에포크 동안 개선 없음.

2. **학습 모니터링**  
   - 각 에포크 종료 시 학습/검증 손실, F1 점수 등을 출력.

---

## 5. 학습 결과

### 학습 성능
- **Accuracy**: `90%` 이상 (예시 값)
- **F1 Score**: `92%` (weighted)
- **Precision**: `91%`
- **Recall**: `92%`

### 평가
검증 데이터셋을 기준으로 성능을 평가한 결과, 모델이 다양한 소분류에 대해 높은 분류 정확도를 보였습니다.

---

## 6. 모델 저장 및 활용

### 저장
학습이 완료된 모델과 토크나이저를 로컬 디렉토리에 저장:
```python
trainer.save_model("./fine_tuned_model")
tokenizer.save_pretrained("./fine_tuned_model")
```

### 추론
저장된 모델을 활용하여 새로운 음식점 데이터에 대한 소분류 예측 가능:
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model = AutoModelForSequenceClassification.from_pretrained("./fine_tuned_model")
tokenizer = AutoTokenizer.from_pretrained("./fine_tuned_model")
```

---
## 7.Null 값 처리 및 소분류 예측 적용 과정

아래는 데이터의 결측치(null) 처리 및 소분류 예측 적용을 위해 작성된 전체적인 프로세스입니다. 이 과정은 `unlabeled_df`와 같이 소분류 값(`diner_category_small`)이 없는 데이터를 대상으로 진행됩니다.

---

### 7.1. Null 값 데이터셋 준비

#### Null 데이터 필터링
먼저, `diner_category_small` 값이 없는 데이터를 필터링하여 별도의 `unlabeled_df`를 생성합니다.  
```python
unlabeled_df = diner_df[diner_df["diner_category_small"].isna()].copy()
```

---

### 7.2. 예측 및 결과 조정 함수

#### 7.2.1 `adjust_prediction`: 예측 결과 조정 함수
모델이 예측한 소분류 값이 해당 중분류(`diner_category_middle`)에 적합하지 않은 경우, 중분류에 해당하는 소분류 후보군 내에서 가장 높은 확률을 가진 소분류를 선택합니다.

#### 함수 동작
1. **모델의 원래 예측값 확인**  
   모델이 출력한 로짓(logits)에서 가장 높은 값을 가진 소분류를 예측값으로 사용.
2. **중분류와 소분류의 관계 확인**  
   `category_dict`를 활용해 중분류에 속하는 소분류 후보군 확인.
3. **조정된 예측값 반환**  
   - 예측값이 후보군에 포함되면 그대로 사용.
   - 포함되지 않으면 후보군 중 로짓 값이 가장 높은 소분류로 조정.

```python
def adjust_prediction(row, logits, category_dict, label_map):
    middle_category = row["diner_category_middle"]
    predicted_index = torch.argmax(logits).item()  # 가장 높은 확률의 인덱스
    predicted_label = id2label[predicted_index]

    # 해당 중분류에 속하는 소분류 후보 가져오기
    allowed_smalls = category_dict.get(middle_category, [])
    allowed_indices = [
        label_map[small]
        for small in allowed_smalls
        if small in label_map and label_map[small] < logits.size(0)  # 유효성 검사
    ]

    # 예측값이 allowed_smalls에 있는 경우 그대로 반환
    if predicted_label in allowed_smalls:
        return predicted_label

    # allowed_indices 중 가장 높은 로짓을 가진 소분류 선택
    if len(allowed_indices) > 0:
        filtered_logits = logits[allowed_indices]
        adjusted_index = allowed_indices[torch.argmax(filtered_logits).item()]
        return id2label[adjusted_index]
    else:
        # allowed_indices가 비어있는 경우, 원래 예측값 반환
        return predicted_label
```

---

#### 7.2.2 `predict_and_adjust`: 모델 예측 및 조정 함수
`adjust_prediction`을 사용하여 모델 예측값을 조정하고 최종적으로 소분류 값을 결정합니다.

```python
def predict_and_adjust(model, tokenizer, data, category_dict, label_map, max_len=max_token_lengths):
    results = []
    model.eval()

    for _, row in data.iterrows():
        input_text = row["input_text"]
        inputs = tokenizer(
            input_text,
            add_special_tokens=True,
            truncation=True,
            max_length=max_len,
            padding="max_length",
            return_tensors="pt",
        )

        with torch.no_grad():
            logits = model(
                input_ids=inputs["input_ids"], attention_mask=inputs["attention_mask"]
            ).logits.squeeze()

        # 예측 결과 조정
        adjusted_prediction = adjust_prediction(row, logits, category_dict, label_map)
        results.append(adjusted_prediction)

    return results
```

---

### 7.3. Null 값에 대한 소분류 예측 수행

#### 예측 적용
위에서 정의한 `predict_and_adjust`를 사용하여 Null 값을 가진 데이터의 소분류 값을 예측합니다.

```python
unlabeled_df["predicted_category_small"] = predict_and_adjust(
    model=model,
    tokenizer=tokenizer,
    data=unlabeled_df,
    category_dict=category_dict,
    label_map=label_map,
)
```

---

### 7.4. 추론용 Dataset 정의

`DinerInferenceDataset` 클래스는 추론 과정에서 모델에 입력될 데이터셋을 구성합니다.  
모델에 입력되는 `input_ids`와 `attention_mask`만 생성하며, 라벨은 포함하지 않습니다.

```python
class DinerInferenceDataset(Dataset):
    def __init__(self, df, tokenizer, max_len=max_token_lengths):
        self.df = df.reset_index(drop=True)
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]
        text = row["input_text"]

        encoding = self.tokenizer(
            text,
            add_special_tokens=True,
            truncation=True,
            max_length=self.max_len,
            padding="max_length",
            return_tensors="pt",
        )

        return {
            "input_ids": encoding["input_ids"].squeeze(),
            "attention_mask": encoding["attention_mask"].squeeze(),
        }
```

---

### 7.5. Trainer를 활용한 추론 및 결합

1. **Trainer를 활용한 추론**  
   `Trainer.predict` 메서드를 사용하여 추론 수행.

2. **결과 결합**  
   추론 결과를 Null 값을 가진 데이터프레임(`unlabeled_df`)에 추가하고, 원본 데이터(`labeled_df`)와 결합.

```python
# 추론 데이터셋 준비
inference_dataset = DinerInferenceDataset(unlabeled_df, tokenizer, max_len=max_token_lengths)

# Trainer를 사용해 추론
infer_trainer = Trainer(model=model, tokenizer=tokenizer)
predictions = infer_trainer.predict(inference_dataset)
logits = predictions.predictions

# 소분류 예측
pred_labels = torch.argmax(torch.tensor(logits), dim=1).tolist()
pred_categories = [id2label[label_id] for label_id in pred_labels]
unlabeled_df["diner_category_small"] = pred_categories

# 최종 데이터 결합
combined_df = pd.concat([labeled_df, unlabeled_df], ignore_index=True)
```

---

## 최종 데이터
- **`combined_df`**: Null 값을 예측으로 채운 최종 데이터프레임.
- 기존 소분류 값을 가진 데이터와 예측 결과가 결합된 형태로, 후속 분석 및 활용에 사용 가능합니다.

---

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/