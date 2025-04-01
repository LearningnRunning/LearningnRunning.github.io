---
layout: post
title:  "그래프 기반 추천 시스템 학습 로드맵"
date:   2025-03-31 19:16:09 +0900
categories: [ML/DL]
description: >
  DisenHAN 연관 논문 리뷰를 위한 로드맵
image: 
  path: https://github.com/LearningnRunning/LearningnRunning.github.io/blob/main/assets/img/blog/DisenHAN_roadmap.png?raw=true
author: LearningnRunning
keywords: GNN, Recommend System, node2Vec, metapath2vec, GNN, GCN, GAT, Attention mechanism, Transformer, KGAT Knowledge Graph Attention Network for Recommendation, Heterogeneous Graph Attention Network (HeteroGAT), Disentangled Heterogeneous Graph Attention Network for Recommendation(DisenHAN), Disentangled Representation Learning
seo:
  date_modified: 2025-03-29
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8


---


쩝쩝LAB에서 맛집 추천시스템을 연구 중입니다. 그래프 기반 추천 시스템이 우리의 태스크를 해결 해줄 것이라 믿고 이에 대해 논문 위주로 리뷰하고 학습할 개념들을 정리하려 합니다. 단계별로 필요한 개념과 논문들을 정리하고 이를 통해 최종적으로 DisenHAN 중점적으로 활용한 **상황과 취향에 맞는 맛집 추천 시스템**을 만들어 볼 예정입니다. 

### 상황과 취향에 맞는 맛집 추천시스템이란?
쩝쩝LAB의 맛집 추천 시스템은 단순히 고정된 사용자 취향을 분석하는 것을 넘어, 상황별로 변화하는 복합적인 선호도를 이해하고 반영합니다.
사용자의 취향은 축적되는 고정갑일지라도 그 취향읠 표현은 다양한 상황 요소에 따라 달라집니다. 날씨가 추운 날엔 따뜻한 국물 요리를, 더운 날엔 시원한 국수를 선호할 수 있습니다. 또한 혼자 식사할 때와 연인과의 데이트, 회식, 아이와 동반하는 가족 모임 등 누구와 함께하는지에 따라 원하는 음식점 유형도, 메뉴도 달라집니다.

다양한 취향과 떄에 따라 다른 상황에 맞추어 맛집을 추천하는 것을 목표로 하고 있습니다.


### DisenHAN이 개인화 맛집 추천에 적합한 이유
취향과 상황에 따른 맛집 추천에 DisenHAN가 적합할 것으로 가설을 세웠습니다.

1. **다양한 선호 요소 분리 (Disentanglement)**
   - 음식점 선택은 여러 요소에 의해 결정됩니다: 맛, 가격, 분위기, 접근성, 서비스 등
   - DisenHAN의 측면별로 독립적으로 학습
   - 다양한 관계가 뒤섞인 이기종 그래프에서, 요인(aspect)마다 분리(disentangled)된 표현을 학습함으로써 얽힘(entanglement)을 피할 수 있음
   - 예를 들어, 같은 사용자가 평일 점심에는 가격과 속도를, 주말 저녁에는 분위기와 맛을 중시하는 상황을 포착할 수 있습니다.

2. **콜드 스타트 문제 해결**
   - 새로운 음식점이나 새로운 사용자에 대한 추천이 어려운 콜드 스타트 문제가 맛집 추천에서 흔히 발생합니다.
   - DisenHAN은 이종 그래프의 다양한 경로를 통해 정보를 전파할 수 있어 직접적인 상호작용 데이터가 없어도 추론이 가능합니다.
   - 예: 새 사용자가 좋아하는 카테고리 정보만으로도 적절한 음식점 추천 가능

3. **맥락 인식 추천 (Context-aware)**
   - 같은 사용자라도 상황(시간, 동행자, 목적 등)에 따라 선호도가 달라집니다.
   - DisenHAN의 어텐션 메커니즘은 상황에 따라 다른 요소들에 가중치를 부여할 수 있습니다.
   - 그래프 구조에 상황 정보를 노드로 추가하면 더욱 맥락 인식적인 추천이 가능합니다.

4. **설명 가능한 추천**
   - 맛집 추천에서는 '왜' 이 음식점을 추천했는지 설명하는 것이 사용자 신뢰에 중요합니다.
   - DisenHAN의 비얽힘 표현과 어텐션 가중치는 추천 이유를 직관적으로 설명할 수 있는 기반을 제공합니다.
   - 예: "당신이 선호하는 분위기(0.7)와 가격대(0.5)를 고려했을 때 이 음식점이 적합합니다."

5. **데이터 희소성 처리**
   - 맛집 추천은 보통 데이터가 희소합니다 (대부분의 사용자는 소수의 음식점만 방문).
   - 이종 그래프 구조는 다양한 경로를 통해 정보를 전파하여 희소성 문제를 완화합니다.
   - 명시적 평가가 없어도 암시적 피드백이나 메타데이터를 활용할 수 있습니다.
   - long tail 음식점도 적절히 추천 가능할 것으로 보입니다.


### DisenHAN을 위한 단계적 학습 계획

![](https://github.com/LearningnRunning/LearningnRunning.github.io/blob/main/assets/img/blog/DisenHAN_roadmap.png?raw=true)

>node2Vec - metapath2vec - GNN - GCN - GAT - Attention mechanism - Transformer - KGAT: Knowledge Graph Attention Network for Recommendation - Heterogeneous Graph Attention Network (HeteroGAT) - Disentangled Heterogeneous Graph Attention Network for Recommendation(DisenHAN) - Disentangled Representation Learning

DisenHAN을 이해하고 구현하기 위해서는 여러 선행 개념들을 단계적으로 학습 필요성을 느꼈습니다. 각 개념이 어떻게 다음 단계의 기반이 되는지, 그리고 최종적으로 어떻게 DisenHAN으로 연결되는지 아래와 같이 계획을 세워보았습니다.

**그래프 임베딩의 기초부터 시작하기**

그래프 기반 추천 시스템의 첫 단계로 **node2Vec**(KDD 2016)부터 시작해야겠습니다. 이 논문은 "node2vec: Scalable Feature Learning for Networks"라는 제목으로, 그래프의 노드를 벡터 공간에 임베딩하는 방법을 제시합니다. Word2Vec의 아이디어를 그래프에 적용한 것으로, Random Walk와 Skip-gram 모델을 활용합니다. DisenHAN의 기초가 되는 그래프 표현 학습의 첫 단계이기 때문에 먼저 이해해야 합니다.

node2Vec을 이해한 후에는 이종 그래프(Heterogeneous Graph)로 확장된 **metapath2vec**(KDD 2017)을 학습할 계획입니다. "metapath2vec: Scalable Representation Learning for Heterogeneous Networks" 논문은 서로 다른 유형의 노드와 에지가 있는 이종 그래프에서 효과적인 임베딩을 생성하는 방법을 제시합니다. 맛집 추천 시스템은 사용자, 음식점, 카테고리, 위치 등 다양한 유형의 노드로 구성되기 때문에 필요합니다.

**그래프 신경망으로의 발전**

임베딩 기법을 이해한 후에는 딥러닝 기반의 **그래프 신경망(GNN)** 개념이 필요합니다. GNN은 그래프 구조 데이터에 딥러닝을 적용하기 위한 프레임워크로, "A Comprehensive Survey on Graph Neural Networks" 논문을 통해 전반적인 개념을 이해할 수 있습니다.

GNN의 대표적인 모델인 **그래프 합성곱 신경망(GCN)**(ICLR 2017)을 다음 단계로 공부해야 합니다. "Semi-Supervised Classification with Graph Convolutional Networks" 논문은 그래프의 인접 행렬과 노드 특성을 합성곱 연산으로 처리하는 방법을 제시합니다. GCN은 DisenHAN의 기본 구성 요소 중 하나이므로 반드시 이해해야 합니다.

**어텐션 메커니즘과 그 응용**

GCN 다음으로는 **어텐션 메커니즘**의 기본 개념을 학습해야 합니다. "Neural Machine Translation by Jointly Learning to Align and Translate"(ICLR 2015) 논문에서 처음 소개된 어텐션은 입력 시퀀스의 중요한 부분에 집중하는 메커니즘입니다. 이는 나중에 그래프에 적용될 GAT의 핵심이므로 반드시 이해해야 합니다.

어텐션 메커니즘에서 발전한 **셀프 어텐션**과 **트랜스포머**(NeurIPS 2017)를 이해하는 것도 중요합니다. "Attention Is All You Need" 논문은 다중 헤드 어텐션을 포함한 트랜스포머 아키텍처를 제시하는데, 이 개념이 그래프 도메인에 어떻게 적용될 수 있는지 이해하는 것이 중요합니다.

어텐션을 이해했다면 이를 그래프에 적용한 **그래프 어텐션 네트워크(GAT)**(ICLR 2018)로 넘어갈 수 있습니다. "Graph Attention Networks" 논문은 이웃 노드들 간의 중요도를 학습하는 방법을 제시합니다. GAT는 DisenHAN의 직접적인 선행 모델이므로 깊이 이해해야 합니다.

**지식 그래프와 이종 그래프 확장**

그래프 어텐션을 이해한 후에는 이를 실제 추천 시스템에 적용한 **KGAT(Knowledge Graph Attention Network)**(KDD 2019)를 살펴보겠습니다. "KGAT: Knowledge Graph Attention Network for Recommendation" 논문은 지식 그래프와 협업 필터링 신호를 통합하여 추천 성능을 향상시키는 방법을 제시합니다. 지식 그래프는 맛집 추천에서 음식점의 특성, 요리 유형, 가격대 등의 정보를 표현하는 데 유용합니다.

다음으로 **이종 그래프 어텐션 네트워크(HeteroGAT)**(WWW 2019)를 살펴보겠습니다. "Heterogeneous Graph Attention Network" 논문은 서로 다른 유형의 노드와 에지를 가진 이종 그래프에서 어텐션 메커니즘을 적용하는 방법을 제시합니다. 맛집 추천은 본질적으로 이종 그래프이므로 이 모델의 이해가 필수적입니다.

**Disentangled Representation Learning과 DisenHAN**

마지막 단계로, **비얽힘 표현 학습(Disentangled Representation Learning)** 개념을 이해해야 합니다. 이는 표현 공간에서 서로 독립적인 요소들을 분리하여 학습하는 방법으로, "Disentangled Representation Learning: A Review and New Perspectives" 논문을 통해 기본 개념을 이해할 수 있습니다.

이 모든 개념을 종합한 **DisenHAN(Disentangled Heterogeneous Graph Attention Network)**이 최종 목표입니다. "Disentangled Representation Learning for Heterogeneous Information Network" 또는 "Disentangled Heterogeneous Graph Attention Network for Recommendation" 논문은 이종 그래프에서 Disentangled Representation Learning을 적용하여 사용자 선호도의 다양한 측면(맛, 가격, 분위기 등)을 분리하여 모델링하는 방법을 제시합니다.

이처럼 각 단계는 다음 단계의 기반이 됩니다. node2Vec에서 시작하여 점진적으로 복잡한 개념을 쌓아가며 최종적으로 DisenHAN에 도달하는 경로를 밟을 예정입니다. 특히 주목할 점은 단순 그래프→이종 그래프, 기본 임베딩→신경망 기반 임베딩→어텐션 기반 임베딩, 그리고 마지막으로 Disentangled Representation Learning으로 발전하는 구조입니다. 이렇게 체계적으로 접근한다면 복잡한 DisenHAN도 확실히 이해하고 구현할 수 있을 것입니다.



### ⭐ 중요 논문 리스트

1. Grover, A., & Leskovec, J. (2016). node2vec: Scalable feature learning for networks. KDD.
2. Dong, Y., Chawla, N. V., & Swami, A. (2017). metapath2vec: Scalable representation learning for heterogeneous networks. KDD.
3. Kipf, T. N., & Welling, M. (2017). Semi-supervised classification with graph convolutional networks. ICLR.
4. Vaswani, A., et al. (2017). Attention is all you need. NeurIPS.
5. Veličković, P., et al. (2018). Graph attention networks. ICLR.
6. Wang, X., et al. (2019). KGAT: Knowledge graph attention network for recommendation. KDD.
7. Wang, X., et al. (2019). Heterogeneous graph attention network. WWW.
8. Wang, X., et al. (2020). Disentangled representation learning for heterogeneous information network. 


---

*이 로드맵은 학습 과정에서 계속 업데이트될 예정입니다. 새로운 논문이나 개념을 발견하면 추가하겠습니다.*

*당장은 그래프 임베딩 기초부터 차근차근 시작해서 DisenHAN까지 나아가는 게 목표입니다.*

---

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/