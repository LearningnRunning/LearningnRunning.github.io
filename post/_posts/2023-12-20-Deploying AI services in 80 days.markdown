---
layout: post
title:  "80일 안에 AI 서비스 배포하기"
date:   2023-12-20 19:11:11 +0900
categories: Tech review
description: >
  대표님 말씀대로 '하루빨리' AI 서비스 개발기
image: 
  path: https://file.noononda.com/article/202306/20230612002916.jpg
---
# 80일 안에 AI 서비스 배포하기


2023년 하반기, SNOW 사의 AI 프로필의 성행으로 AI를 기반으로 내가 찍은 듯한 사진을 제공하는 서비스가 큰 인기를 끌었다. 이에 우리 회사 대표님도 이러한 서비스를 개발하고 싶다는 뜻을 밝히셨다. 그것도 "하루 빨리"


![](https://file.noononda.com/article/202306/20230612002916.jpg)
이에 따라, 2023년 7월 26일, AI 사진 서비스 프로젝트가 시작되었다. 다시 한번 멘땅의 헤딩이 시작되는 듯 하였지만 저번 프로젝트 [BalanceMakeUp]와 달리 확실한 레퍼런스가 있는 듯하여 조금은 안심이 되었다. 두려웠던 건 빡빡한 프로젝트 기간과 유료 서비스 계획이었다. 

먼저, SNOW의 AI 프로필을 리뷰하였다. 또한, 메이튜, [캐럿](https://carat.im/)과 같이 AI 이미지 생성 서비스를 하고 있는 다른 플랫폼도 리뷰하였다. 

## AI 프로필은 사실 딥페이크?

레퍼런스 조사를 통해 경쟁 서비스의 구현 구조를 파악하려 하였다. 처음엔 Stable Diffusion를 활용한 사진 생성 서비스가 아닐까 하였지만 실제는 옷이나 배경은 변경하지 않고 얼굴만 바꿔주는 서비스가 아닐까 싶었다.
![](https://velog.velcdn.com/images/sungrok7/post/c8ca0979-c52a-4c1b-8ccf-b5cedad1fe90/image.jpg)

이 가설을 토대로 기능 설계를 해보았다. 먼저 틀로 쓸 사진 세트가 필요했고 이용자의 얼굴을 딥페이크로 입혀보는 기능을 준비했다. 

## 사진 테마 정하기
AI프로필과는 완전히 똑같이 할 수 없었고 다른 테마가 필요했다. 레퍼런스 조사를 통해 경쟁 서비스가 이용자들에게 어떤 만족을 주고, 어떤 욕구를 해결해주었는지 살펴보았다. 

- 다른 장소나 스타일링을 손쉽게 경험할 수 있다.
- 정돈된 모습으로 자신을 표현할 수 있다.

이러한 이용자의 니즈와 SNOW사의 AI프로필과의 차별점을 살려, Snap 사진을 콘셉트로 정했고 서비스 이름도 'AI Snap'으로 하였다.

Snap사진은 이용자들이 다양한 경험과 자신을 표현할 수 있는 기회를 제공하고자 한다. 다양한 장소와 스타일링으로 전문 작가가 찍은 듯한 사진을 제공하는 것이 서비스의 목표였다.

전문 작가가 찍은 것처럼 각 테마별로 세트를 준비하였다. 예를 들어, 봄 버전은 꽃이 만개했고 여름은 싱그러운 파란색 배경에서 가을은 단풍이나 은행나무 배경으로 겨울은 흰 배경으로 사계절를 세트로 하였다. AI 서비스 특성상 일회성 이용이 아닌 여러 테마를 제공함으로써 지속적인 관심을 유도할 수 있다는 장점도 가지고 있다.
![](https://velog.velcdn.com/images/sungrok7/post/5a72e14c-24f1-4e45-b641-712e021eae6f/image.jpg)



## 선명하지 않음이 오히려 자연스럽다는 것

AI 사진 특성상 피부가 매우 매끄럽다. 딥페이크를 적용한 결과물을 Photoshop에서 이런 저런 조정을 해보며  AI스럽지 않은 이미지를 만들어 보았다.

- 대비를 낮추어, 사진의 자연스러움을 높였다.
- Noise를 추가하여, 사진의 질감을 살렸다.

이를 OpenCV를 이용하여 적용해보았다.
![](https://velog.velcdn.com/images/sungrok7/post/1725ed5f-c3fc-4e0f-91f6-f1c427c5068d/image.jpg)


# 결론
71일 만에 Phase 1이 배포되었고 지금은 Phase 2에서는 좀더 여러 테마를 보일 예정이다. 
![](https://velog.velcdn.com/images/sungrok7/post/21daf748-d86f-4621-b602-33a1c8fc79d7/image.jpg)



사진출처
[AI프로필 흑백이미지1](https://imnews.imbc.com/news/2023/enter/article/6499488_36161.html)
[AI프로필 흑백이미지2](https://m.blog.naver.com/chois909/223120487534?isInf=true)
[AI프로필 흑백이미지3](https://lemontealove.tistory.com/190)
작성자 생성 사진[이효리님의 사진을 사용하여 생성한 이미지]



[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
