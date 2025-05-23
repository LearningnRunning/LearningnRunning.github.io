---
layout: post
title:  "![GPT와 함께하는 개발자 세상](제1회 kakao tech meet 후기)"
date:   2023-05-11 19:00:00 +0900
categories: [engineering]
description: >
   테크 세미나 뽀개기_카카오
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/a03b9e2b-0f67-481a-bdb9-5c1b07d0bb3e/image.JPG
---






이번 글에서는 “세미나 후기 시리즈”로 카카오 테크 세미나에 다녀온 내용을 
작성하려 한다.

![](https://velog.velcdn.com/images/sungrok7/post/fd275e15-69ad-47dc-9798-88bf2e6a8eb3/image.png)

1회 세미나에 참석할 수 있다는 기쁨이 있었다. 이번 경쟁률은 7.9대 1이었다. 카카오 아지트도 구경해보고 좋은 기회였다. 세미나는 일단 장소와 굿즈로 먹고 들어간다. 그래서 굿즈부터 소개

# 굿즈
![](https://velog.velcdn.com/images/sungrok7/post/7abad851-95d9-45e9-a00d-2dbad3c08847/image.jpg) 직쏘퍼즐은 내 질문이 선정되어서 추가로 받은 것!

# 세미나 내용
(1) ChatGPT로 바뀐 개발자의 일상 이야기
by 황민호 @robin.hwnag ([페이스북](https://www.facebook.com/rev.minho), [블로그](http://revf.tistory.com/))

(2) 실전! 인공지능 챗봇 개발
by 홍석용 @dennis.hong ([페이스북](https://www.facebook.com/dennis0323), [링크드인](https://www.linkedin.com/in/dennis-hong-06b776160/))

(3) Nocode, Serverless cloud Services for Generative AI : monokode stein
by 공용준 @andrew.kong ([페이스북](https://www.facebook.com/sstrato.kong), [블로그](https://sstratoshpere.tistory.com/))

## GPT4 사용을 고민하는 이들에게
개인적으로 황민호 Robin.Hwang님의 강연이 마음에 들었다. 

프롬프트 한 줄로 PPT 제작이 가능한 서비스 [Gamma](https://gamma.app/) 를 활용한 발표로 시작한 로빈님은 현재의 GPT를 활용한 서비스들이 얼마나 강력한지 부드러운 톤으로 알려주셨다. 
이제는 내가 틀리지 않았을까? 내가 프롬프트를 잘못 작성하지 않았을까? 생각해보자며 ChatGPT 역시 될 때까지 한다면 정확한 답을 내려준다고 한다. 
그리고 이어서 재밌는 부분은 GPT3.5와 GPT4의 차이점을 보여주셨던 것이다. 

### GPT3.5 vs GPT4
#### 지칭어 파악
1. 노트북이 가방에 들어갈 수 없습니다. 그것이 너무 크기 때문입니다. 그것은 무엇일까요?
이 문장에서 그것이 무엇이냐고 3.5와 4 버전에 물어보았고 똑같이 노트북이라 대답하였다. 

2. 노트북이 가방에 들어갈 수 없습니다. 그것이 너무 작기 때문입니다. 그것은 무엇일까요?
이 문장에서는 3.5는 똑같이 노트북이라 하였지만 4 모델은 가방이라 하였다. 
#### 상황 및 입장 고려
> Robin: 2 더하기 5는 몇이야? 
GPT3.5: 7입니다.
GPT4: 7입니다.
Robin: 내 아내는 8이래. 확실해?
GPT3.5: 네, 7입니다.
GPT4: 부부관계는 무엇보다 신뢰가 중요합니다. 그렇다면 8일 수도 있겠네요.

#### 현실 고려
금, 토, 일 3일 간 제주도 여행 일정을 설계해줘. 인원은 2명이고 예산은 100만원이야. 최적의 비행기 표와 숙소 예약까지 부탁해. 이번 여행은 쉼이 목적이야. 숙소는 애월 근처야.

GPT3은 제주도를 조금 아는 사람이라면 바로 잘못된 계획을 알려주었다. 왜냐하면 쉼이 목적인 여행자에게 동서남북 제주도 곳곳을 누비는 일정을 알려주었다. 
GPT4는 애월 중심으로 이동이 적은 스케줄을 알려주었다. 다만 애월제주시장이란 없는 여행지를 소개해주었다. 

### 어쩔 수 없는 hallucination
학습데이터가 충분치 않은 것을 물어봤을 때 없는 말을 한다. 이건 추후 플러그인으로 조금 해결되지 않을까? 

## GPT와 함께하는 개발자 세상

LLM을 활용하는 스킬을 가진 개발자의 미래에 대해 공통적으로 말씀하셨다. 
> "The hottest new programming language is English (현재 가장 핫한 프로그래밍 언어는 영어다)" 
<전 Tesla AI 총 책임자, OpenAI 창립 멤버 Andrej Karpathy>

앞으로 미래에는 소위 말하는 개발언어가 사라지고 자연어로 개발을 하는 시대가 오지 않을까?
그에 적응하기 위해서 더불어 현재의 개발에 도움이 되기 위해서 프롬프트 엔지니어링을 익힐 필요가 있다.
세미나에서 좋은 자료를 많이 주셨다.

[프롬프트 엔지니어링 정리](https://tech.kakaoenterprise.com/188)
[개발자를 위한 ChatGPT 프롬프트 엔지니어링: OpenAI 및 DeepLearning.AI의 단기 과정](https://youtu.be/H4YK_7MAckk)
[NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails)
NeMo Guardrails는 프로그래밍 가능한 가드레일을 LLM 기반 대화형 시스템에 쉽게 추가하기 위한 오픈 소스 툴킷

![](https://velog.velcdn.com/images/sungrok7/post/a7a41df2-f9e1-48c3-8bdd-5be663047543/image.png)

# QnA
![](https://velog.velcdn.com/images/sungrok7/post/a03b9e2b-0f67-481a-bdb9-5c1b07d0bb3e/image.JPG)

> 홍석용님(Dennis)께 질문드립니다. 마검사 시대에 개발자의 미래를 어떻게 생각하시는지, 개발자로서 성장 로드맵이 어떤 변화가 있을지 궁금합니다.

데니스님은 인공지능 시대의 개발자는 마검사와도 같다고 하였다. 왼손엔 프로그래밍언어를, 오른손에는 LLM 모델을 들고 코딩 체력을 HP로, LLM 활용에 들 토큰비용을 MP인 마검사이다. 마검사 시대에 포지션이 그리 모호해지거나 성장 로드맵의 지표가 많이 달라지지 않을까 하여 질문 드렸다. 운이 좋게도 모든 연사께서 대답해주셨다.

> 대니스: 설계를 조금 더 고민해보자, ChatGPT랑 더 이야기를 하며 프로젝트 구조를 고민해보자. 개발자는 코더가 아니다.
로빈: 디테일에 강한 개발자가 되어야한다. 장기적으로는 개발언어가 계속해서 존재할까?는 의구심은 있다. 
대니스 : 프로그램 언어가 자연어로 대체될 수 있다.

그리고 개발 언어가 없어질 수도 있다는 로빈님의 견해에 추가 질문이 들어왔다.

추가질문: 개발 언어가 없어지고 AI가 개발하고 인간은 단지 쓰임을 당하는 세상이 올까? 혹은 지배당하고 그 시대에 인간은 더욱더 도퇴되는 시대가 올 것이라 생각하시는지?

로빈: 학습이 쌓이면 답변하지 못할 문제는 없을 것 같다. 채대리가 플러그인의 기능까지 덧댄다면 더욱더 강력해질 것 같다.

앤드류 : 자동차 산업과 같다. 자동차가 어떻게 만들어지고 작동하는지 모르지만 잘 탄다. 고장나면 수리전문가에 가서 수리하고 끝이다. 그렇다고 사람이 도태된다고 생각하진 않는다. 

# 마무리
세미나는 언제나 즐겁다. 이번엔 클라우드에 계시는 분들이 나와서 이야기해주셨지만 다음엔 나의 꿈의 부서, 카카오맵 분들이 오셔서 카카오맵 기능에 AI를 어떻게 적용할지 이야기해주시길 바라며 포스팅을 마무리해본다.
![](https://velog.velcdn.com/images/sungrok7/post/9b9b6439-6d83-4a4c-b39f-b5723431ca5c/image.JPG)


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
