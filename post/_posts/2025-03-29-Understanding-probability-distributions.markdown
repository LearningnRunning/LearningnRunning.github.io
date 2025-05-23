---
layout: post
title:  "ML를 위한 확률분포의 이해"
date:   2025-03-29 19:16:09 +0900
categories: [probability-statistics]
description: >
  확률분포 개념과 음식점 데이터 분석에 활용하기
image: 
  path: https://datasciencedojo.com/wp-content/uploads/Important-Distributions-in-Data-Science-1.jpg
author: LearningnRunning
keywords: 확률분포, 통계, 베르누이, 이항분포, 정규분포, 포아송분포, 음식점추천, 데이터분석, 확률모델
seo:
  date_modified: 2025-03-29
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8


---

아래 글은 확률과 통계 중에서도 '확률분포' 전반에 관한 핵심 개념들을 정리한 뒤, 이를 음식점(맛집) 추천 시나리오와 연결하여 예시로 설명하는 형태로 작성하였습니다. 맛집 데이터를 분석하거나, 맛집 방문 패턴을 모델링할 때 자주 등장하는 분포들을 개념적으로 이해하는 데 도움을 드리고자 합니다.

---

## 1. 들어가며

맛집을 추천하고자 할 때, 기본적으로 "특정 사건이 일어날 확률"을 모델링하고, 이를 통해 다양한 예측을 수행하게 됩니다. 예컨대 특정 사람이 A라는 맛집에 방문할 확률, 어느 시간대에 손님이 몇 명이나 도착할 확률 등이 있겠죠. 이런 문제를 풀 때 핵심 도구가 바로 **확률분포(probability distribution)**입니다.

본 포스트에서는 자주 쓰이는 **베르누이, 이항, 초기하, 다항, 포아송, 지수, 균일, 정규, 기하, 음이항** 분포를 소개하고, 각 분포의 **평균과 분산**을 계산하는 과정도 간략히 살펴보겠습니다. 마지막에는 모든 개념을 음식점 사례에 연결해 실용적으로 이해할 수 있도록 예시를 들어보겠습니다.

---

## 2. 기본 용어 정리

1. **표본공간(Sample Space)**: 확률실험에서 발생 가능한 모든 결과들의 집합입니다. 예: "오늘 갈 수 있는 모든 음식점의 집합"
2. **확률변수(Random Variable)**: 표본공간의 각 원소에 실수값을 대응시키는 함수 개념입니다. 예: "오늘 방문할 식당의 '평점'"이 될 수도 있고, "오늘 방문한 식당의 '종류'(한식=1, 중식=2 등)"가 될 수도 있습니다.
3. **확률분포(Probability Distribution)**: 확률변수가 가질 수 있는 값들과 그 값이 나타날 확률(또는 확률밀도) 간의 대응 관계입니다.
4. **이산 확률변수(Discrete Random Variable)** / **연속 확률변수(Continuous Random Variable)**: 
   - 이산형은 "0, 1, 2, …"처럼 셀 수 있는 경우의 수를 가집니다(예: 손님 수). 
   - 연속형은 "실수 구간 상의 값"을 가집니다(예: 방문 간격 시간).
5. **확률질량함수(PMF)** / **확률밀도함수(PDF)**: 
   - 이산 확률변수에는 각각의 값에 대응하는 **확률질량함수**가 있습니다(예: $$P(X=2)=0.3$$ 등).
   - 연속 확률변수에는 특정 구간에서의 상대적 가능도를 나타내는 **확률밀도함수**가 있으며, 실제 확률은 적분으로 계산합니다.


---

## 3. 주요 확률분포 소개

### (1) 베르누이 분포 (Bernoulli Distribution)
- **정의**: 한 번의 시행에서 결과가 '성공(1)' 또는 '실패(0)' 두 가지뿐인 이산 확률분포입니다. 성공 확률을 $$p$$라 하면,
  
  $$P(X=1) = p,\quad P(X=0) = 1-p.$$
  
- **평균**: $$E[X] = p$$
- **분산**: $$\mathrm{Var}(X) = p(1-p)$$
- **음식점 예시**: "어떤 사람이 오늘 특정 맛집을 방문한다(1) / 방문하지 않는다(0)"를 확률적으로 모델링할 수 있습니다. 방문 성공 확률이 $$p$$라면, 이는 베르누이 시도로 볼 수 있습니다.

---

### (2) 이항분포 (Binomial Distribution)
- **정의**: 서로 독립적인 베르누이 시행을 $$n$$번 반복했을 때, '성공'이 몇 번 나오는지를 나타내는 분포입니다. 성공 확률을 $$p$$라 할 때,
  
  $$P(X = k) = \binom{n}{k}p^k(1 - p)^{n - k}, \quad k = 0,1,\dots,n.$$
  
- **평균**: $$E[X] = np$$
- **분산**: $$\mathrm{Var}(X) = np(1-p)$$
- **음식점 예시**: "일주일(7일) 동안 매일 베르누이 시행을 한다고 가정했을 때, 특정 맛집을 방문한 일수가 며칠인가?"와 같은 질문을 모델링할 수 있습니다. 예를 들어 방문 확률이 $$p$$라고 할 때, 7번의 독립된 '방문 or 미방문' 결과 중에서 실제로 방문한 횟수가 이항분포를 따릅니다.

---

### (3) 초기하분포 (Hypergeometric Distribution)
- **정의**: 모집단에 '성공' 항목이 $$K$$개, '실패' 항목이 $$N-K$$개 있다고 할 때, **비복원 추출**(한 번 뽑은 항목은 다시 넣지 않음)로 $$n$$개를 뽑았을 때 성공 항목이 $$k$$개 뽑힐 확률을 나타내는 분포입니다. 이항분포는 n번 시행할 때에 확률값인 $$p$$를 유지하지만 초기하분포는 비복원 추출로 성공확률이 바뀝니다.
  
  $$P(X = k) = \frac{\binom{K}{k}\,\binom{N-K}{n-k}}{\binom{N}{n}}.$$
  
- **평균**: $$E[X] = n \cdot \frac{K}{N}$$
- **분산**: $$\mathrm{Var}(X) = n\frac{K}{N}\left(1-\frac{K}{N}\right)\frac{N-n}{N-1}$$
- **음식점 예시**: 예를 들어, 손님들 중 '단골손님'이 전체 $$N$$명 중 $$K$$명 있다고 합시다. 그중 무작위로 $$n$$명을 골랐을 때 단골손님이 몇 명 포함되어 있을까?를 모델링할 수 있습니다. (단, 다시 돌려놓는 복원추출이 아닌, 실제로 고른 $$n$$명을 빼고 나서는 재추출을 하지 않는 경우)

---

### (4) 다항분포 (Multinomial Distribution)

#### (4_1) 다항시행(Multinomial trial)

- **정의**: 베르누이 시행을 확장한 형태로, 각 시행에서 $$k$$개의 가능한 결과 중 하나가 발생합니다. 각 결과가 발생할 확률은 $$p_1, p_2, \dots, p_k$$이며, $$\sum_{i=1}^k p_i = 1$$입니다.

- **특성**: 다항시행은 서로 배타적인 $$k$$개의 결과 중 정확히 하나만 발생하는 시행입니다. 각 시행은 독립적이며, 결과 발생 확률은 모든 시행에서 동일합니다.

- **음식점 예시**: 고객이 음식점에 방문했을 때, "매우 만족(A)", "만족(B)", "보통(C)", "불만족(D)"와 같이 여러 평가 범주 중 하나를 선택하는 것은 다항시행으로 볼 수 있습니다.

#### (4_2) 다항분포(Multinomial Distribution)

- **정의**: 이항분포를 여러 개의 범주로 확장한 형태입니다. $$n$$번의 시행에서 결과가 여러 가지 범주(예: A, B, C, …)로 나타날 때, 각 범주에 속하는 횟수를 동시에 확률적으로 묘사합니다. 범주 $$k$$개, 각 범주 발생 확률을 $$p_1, p_2, \dots, p_k$$라 할 때,
  
  
  $$P(((n_1, n_2, ..., n_k))) = \frac{n!}{n_1!...n_k!}p_1^{n_1}p_2^{n_2}...p_k^{n_k}$$

- **평균**: $$E[X_i] = n p_i$$
- **분산**(단일 $$X_i$$): $$\mathrm{Var}(X_i) = n p_i (1 - p_i)$$
- **공분산**(두 변수 $$X_i$$와 $$X_j$$ 사이): $$\mathrm{Cov}(X_i, X_j) = -n p_i p_j$$ (단, $$i \neq j$$)
- **음식점 예시**: "일주일 동안, 한식(A), 중식(B), 양식(C)을 각각 몇 번씩 방문할 것인가?" 같은 문제를 생각할 수 있습니다. 1주일 동안 7회 외식한다고 가정했을 때, 각 범주(한식, 중식, 양식)의 방문 확률이 $$(p_1, p_2, p_3)$$라면, 7번의 결과에 대한 (A 방문 횟수, B 방문 횟수, C 방문 횟수)를 다항분포로 표현합니다.

#### (4_3) 다항분포의 특성

- **이항분포와의 관계**: 범주가 2개인 특수한 경우($$k=2$$)는 이항분포와 동일합니다.
- **주변분포**: 각 $$X_i$$는 독립적으로 이항분포 $$B(n, p_i)$$를 따릅니다.
- **조건부 분포**: 어떤 범주의 발생 횟수를 알 때, 나머지 범주들의 발생 횟수 분포는 다시 다항분포를 따릅니다.
- **응용**: 다항분포는 텍스트 분석, 투표 예측, 고객 선호도 분석 등에 널리 사용됩니다.

#### (4_4) 맛집 추천에서의 응용

- **메뉴 선호도 분석**: 고객들이 각 카테고리(한식, 일식, 중식 등)의 음식점을 선택하는 비율을 예측하는 데 사용할 수 있습니다.
- **평점 분포 모델링**: 음식점의 별점(1~5점)이 각각 나타날 확률을 다항분포로 모델링하여 전체적인 평점 패턴을 분석할 수 있습니다.
- **식사 시간대 예측**: 아침, 점심, 저녁, 야식 등 각 시간대별 방문 횟수 분포를 다항분포로 모델링하여 음식점의 운영 시간 최적화에 활용할 수 있습니다.

---

### (5) 포아송분포 (Poisson Distribution)
- **정의**: 단위 시간(또는 공간)당 평균 발생 횟수가 $$\lambda$$일 때, **해당 시간 구간**에서 사건이 몇 번 발생하는지를 나타내는 분포입니다. 확률질량함수는
  
  $$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0,1,2,\dots$$
  
- **평균**: $$E[X] = \lambda$$
- **분산**: $$\mathrm{Var}(X) = \lambda$$
- **음식점 예시**: "1시간 동안 특정 맛집에 도착하는 손님 수"를 모델링할 때 쓸 수 있습니다. 보통 '어떤 시점'에 손님이 올 확률이 낮지만, 많은 시점에 걸쳐 사건이 일어날 수 있다고 가정할 때 자주 활용합니다.

---

지수분포에 대한 정의를 더 완성하겠습니다:

### (6) 지수분포 (Exponential Distribution)
- **정의**: 포아송 과정을 기반으로, **두 사건(도착) 사이의 간격**이 따르는 연속 분포입니다. 어떤 사건이 발생하기까지 걸리는 시간을 뜻합니디ㅏ. <br><br>

모수 $$\lambda$$에 대해 확률밀도함수(확률질량함수가 아닌 pdf)는
  
  $$f(t) = \lambda e^{-\lambda t}, \quad t \ge 0.$$
  
  여기서 $$\lambda$$는 단위 시간당 사건 발생 비율을 나타냅니다. 그리고 누적분포함수는
  
  $$F(t) = P(X \leq t) = 1 - e^{-\lambda t}, \quad t \ge 0.$$
  
  즉, 지수분포는 사건이 발생하기까지 얼마나 오래 기다려야 하는지를 모델링합니다.

- **무기억성(Memoryless Property)**: $$P(X > s + t | X > s) = P(X > t)$$ 
이는 이미 $$s$$ 시간을 기다렸다고 해도, 추가로 $$t$$ 시간을 더 기다릴 확률은 처음부터 $$t$$ 시간을 기다릴 확률과 같다는 의미입니다.
- **최소값 분포**: 여러 개의 독립적인 지수분포 확률변수 중 최소값 역시 지수분포를 따릅니다.
- **포아송 과정과의 관계**: 포아송 과정에서 **연속**된 사건 사이의 시간 간격은 지수분포를 따릅니다.

- **평균**: $$E[X] = \frac{1}{\lambda}$$
- **분산**: $$\mathrm{Var}(X) = \frac{1}{\lambda^2}$$
- **중앙값**: $$\text{Median}(X) = \frac{\ln(2)}{\lambda}$$
- **음식점 예시**: 음식점의 로테이션 시간을 모델링할 때 사용됩니다. 예를 들어, 인기 맛집에 시간당 평균 6명의 손님이 방문한다면($$\lambda = 6$$), 다음 손님이 도착할 때까지 기다려야 하는 평균 시간은 1/6시간(10분)입니다.

- **맛집 추천에서의 활용**:
  - **대기 시간 예측**: 특정 음식점의 테이블 회전율이나 대기 시간을 모델링하는 데 활용할 수 있습니다.
  - **서비스 시간 분석**: 주문부터 음식이 나오기까지 걸리는 시간 분포를 모델링할 수 있습니다.
  - **예약 간격 최적화**: 예약 시스템에서 적절한 예약 간격을 설정하는 데 도움을 줄 수 있습니다.

---

### (7) 균일분포 (Uniform Distribution)
- **정의**: 연속 구간 $$[a,b]$$에서 모든 값이 균등(동일)한 확률로 나타나는 분포입니다. 확률밀도함수는
  
  $$f(x) = 
  \begin{cases}
    \frac{1}{b-a}, & a \le x \le b \\
    0, & \text{otherwise}
  \end{cases}$$
  
- **평균**: $$E[X] = \frac{a+b}{2}$$
- **분산**: $$\mathrm{Var}(X) = \frac{(b-a)^2}{12}$$
- **음식점 예시**: 예를 들어, "지역 내 맛집을 전혀 정보 없이 하나 골라보자"고 할 때, 리스트에 있는 $$N$$개 후보가 모두 똑같은 가능성으로 선택된다고 보면, 이산형 균일분포가 될 수 있습니다(연속형 균일분포의 경우엔, 예컨대 일정 구간에 랜덤 위치로 이동하는 경우를 생각할 수 있습니다).

---

### (8) 정규분포 (Normal Distribution)
- **정의**: 가장 널리 쓰이는 연속 확률분포로, 중심극한정리에 의해 많은 확률변수들의 합이 극한적으로 정규분포에 근사하게 됩니다. 평균 $$\mu$$, 분산 $$\sigma^2$$일 때 확률밀도함수는
  
  $$f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right).$$
  
- **평균**: $$E[X] = \mu$$
- **분산**: $$\mathrm{Var}(X) = \sigma^2$$
- **음식점 예시**: "고객들이 특정 맛집에 부여하는 평점"이 여러 요인의 합(맛, 서비스, 분위기, 가격 등)으로 결정된다면, 많은 요인의 합이므로 정규분포에 가깝게 분포할 수 있습니다.

---

### (9) 기하분포 (Geometric Distribution)
- **정의**: 베르누이 시행을 독립적으로 반복할 때, **첫 성공**이 일어나는 시점(시행 횟수)을 나타내는 이산 확률분포입니다(정의에 따라 약간씩 다른 버전이 있음). 성공 확률을 $$p$$라 할 때,
  
  $$P(X = k) = (1-p)^{k-1}p, \quad k = 1,2,\dots$$
  
- **평균**: $$E[X] = \frac{1}{p}$$
- **분산**: $$\mathrm{Var}(X) = \frac{1-p}{p^2}$$
- **음식점 예시**: "맛집을 하나씩 시도하다가, 처음으로 '정말 만족스러운 맛집(성공)'을 만나는 데 걸리는 방문 횟수" 등을 모델링할 수 있습니다.

---

### (10) 음이항분포 (Negative Binomial Distribution)
- **정의**: 기하분포를 확장하여, 베르누이 시행에서 **$$r$$번의 성공**을 얻을 때까지 반복한 시행 횟수를 나타내는 분포입니다. 성공 확률 $$p$$, 실패 확률 $$1-p$$일 때,
  
  $$P(X=k) = \binom{k-1}{r-1} p^r (1-p)^{k-r}, \quad k = r, r+1, r+2, \dots$$
  
  (여기서 $$k$$는 성공 $$r$$번을 포함한 전체 시행 횟수)
  
- **평균**: $$E[X] = \frac{r}{p}$$
- **분산**: $$\mathrm{Var}(X) = \frac{r(1-p)}{p^2}$$
- **음식점 예시**: "정말 만족스러운 맛집을 $$r$$곳 찾을 때까지, 몇 번 다른 식당(실패 포함)을 가봐야 하는가?" 같은 문제를 모델링할 수 있습니다.

---

## 4. 음식점(맛집) 시나리오로 보는 확률분포 활용 예시

마지막으로, 실제 맛집 추천 시나리오에서 위 분포들을 어떻게 연결해서 쓸 수 있는지 간단히 살펴보겠습니다.

1. **베르누이·이항분포**: 
   - 한 사람이 특정 맛집을 "방문할지 말지" 예측(베르누이) 
   - 특정 기간(예: 일주일) 동안 몇 번 방문할지(이항)

2. **포아송·지수분포**:
   - 한 시간 동안 도착하는 손님 수(포아송) 
   - 손님 간 도착 간격(지수)
   - 예약 전화가 걸려오는 간격, 배달 주문 간격 등을 모델링

3. **다항분포**:
   - 특정 기간 동안 한식/양식/중식 중 각각 몇 번 방문할지 
   - 여러 범주로 나누어 방문 횟수를 동시에 추적

4. **정규분포**:
   - 여러 요인(맛, 가격, 서비스 등)의 합으로 결정되는 고객 평점 분포 
   - 고객 개별 차이가 누적되면서 평균 방문 빈도나 평균 지출액이 정규분포로 근사되는 경우

5. **기하·음이항분포**:
   - 만족스러운 맛집을 찾을 때까지 랜덤 시도(기하) 
   - 만족스러운 맛집을 $$r$$곳 찾을 때까지의 총 시도 횟수(음이항)

6. **초기하분포**:
   - 전체 손님 $$N$$명 중 단골이 $$K$$명일 때, 임의로 $$n$$명을 뽑았을 때 단골이 몇 명 섞여 있는지 
   - 복원추출이 아니라 '한 번 뽑힌 사람은 빠지는' 실제 고객 샘플링 상황

---
## 5. 참고자료

1. [서울대 통계학과 Data Science & Machine Learning의 유튜브](https://www.youtube.com/playlist?list=PL7xWh2jarbwfltsgCht80AUM-v57evFVY)
2. [통계의 본질 EOStatistics의 유튜브](https://www.youtube.com/watch?v=xDaUQjUr0ZM&list=PLmljWRabIwWBNjA5e6-qOVeB4BaY0Sima)

---

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/