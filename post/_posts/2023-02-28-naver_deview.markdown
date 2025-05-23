---
layout: post
title:  "NAVER DEVIEW 2023 후기"
date:   2023-02-28 19:11:11 +0900
categories: ml-dl
description: >
  취향식탁을 2016년부터 하고 있던 네이버 AirSearch 팀을 발견하다
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/d9f2df60-df11-4367-9ed0-ee2c206a81f2/image.jpeg
author: LearningnRunning
keywords: NAVER, DEVIEW, 개발자 컨퍼런스, 텍스트 렌더링, OCR, 추천시스템, Continual Learning, HyperLocal, AI, 이미지 번역
seo:
  date_modified: 2023-03-10
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8
---

3년 만에 오프라인으로 개최한 네이버 개발자 컨퍼런스에 다녀왔다. 추후 온라인으로도 풀리겠지만 저번 AI엑스포에 다녀온 경험이 좋아서 현장으로 꼭 다녀오고 싶었다. 오랜만에 연 오프라인 DEVIEW라서 티켓팅이 싸이 콘서트만큼 힘들었다고 들었다. 다녀오지 못한 분들을 위해 다녀온 만큼의 정보를 얻을 수 있는 포스팅을 한다. 

# 세션 소개
[Home](https://deview.kr/2023/sessions) 세션마다 간략한 소개, 발표자 정보 그리고 발표자료가 정보가 있다. 

[질문방](https://ntalk.naver.com/ch/N1nth)

## 09:50 ~ 10:45 
> KEYNOTE




키노트 외에는 4개의 파티션으로 나눠 진행했습니다. 

## 11:15 ~ 12:00
['더' 잘 읽히고 자연스러운 이미지 번역을 위해(파파고 텍스트 렌더링 개발기)](https://deview.kr/data/deview/session/attach/[141]+'%EB%8D%94'+%EC%9E%98+%EC%9D%BD%ED%9E%88%EA%B3%A0+%EC%9E%90%EC%97%B0%EC%8A%A4%EB%9F%AC%EC%9A%B4+%EC%9D%B4%EB%AF%B8%EC%A7%80+%EB%B2%88%EC%97%AD%EC%9D%84+%EC%9C%84%ED%95%B4(%ED%8C%8C%ED%8C%8C%EA%B3%A0+%ED%85%8D%EC%8A%A4%ED%8A%B8+%EB%A0%8C%EB%8D%94%EB%A7%81+%EA%B0%9C%EB%B0%9C%EA%B8%B0).pdf)

![Screenshot](../../assets/img/blog/papago_deview_1.png)

여러 환경에서도 정확하게 구현 가능한 OCR 성능도 놀라웠는데, 거기에 그치지 않고 높은 가독성을 위해, 배경 처리/ 글자 정렬/ 글자 색상 맞추기 등 이들 팀의 노력이 정말 놀라웠다. 서비스를 임하는 그들의 의지와 자세를 많이 배울 수 있었고 멋있었다.

## 12:15 ~ 13:00
[초등학생 AI모델 고등학교 보내기: Continual Learning으로 지속적으로 성장하는 AI 시스템 만들기](https://deview.kr/data/deview/session/attach/[112]%EC%B4%88%EB%93%B1%ED%95%99%EC%83%9D%20AI%EB%AA%A8%EB%8D%B8%20%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90%20%EB%B3%B4%EB%82%B4%EA%B8%B0%20Continual%20Learning%EC%9C%BC%EB%A1%9C%20%EC%A7%80%EC%86%8D%EC%A0%81%EC%9C%BC%EB%A1%9C%20%EC%84%B1%EC%9E%A5%ED%95%98%EB%8A%94%20AI%20%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EB%A7%8C%EB%93%A4%EA%B8%B0.pdf)

## 14:00 ~ 14:45
[검출과 인식 모델을 하나로? : challenge 우승 OCR 서비스 모델 새 출시!](https://deview.kr/data/deview/session/attach/[143]%EA%B2%80%EC%B6%9C%EA%B3%BC%EC%9D%B8%EC%8B%9D%EB%AA%A8%EB%8D%B8%EC%9D%84%ED%95%98%EB%82%98%EB%A1%9C+challenge+%EC%9A%B0%EC%8A%B9+OCR%EB%AA%A8%EB%8D%B8+%EC%83%88%EC%B6%9C%EC%8B%9C.pdf)

## 15:00 ~ 15:45
[상황에 맞는 취향 장소 발견하기. HyperLocal 추천 시스템 A to Z](https://deview.kr/data/deview/session/attach/[134]%EC%83%81%ED%99%A9%EC%97%90+%EB%A7%9E%EB%8A%94+%EC%B7%A8%ED%96%A5+%EC%9E%A5%EC%86%8C+%EB%B0%9C%EA%B2%AC%ED%95%98%EA%B8%B0.+HyperLocal+%EC%B6%94%EC%B2%9C+%EC%8B%9C%EC%8A%A4%ED%85%9C+A+to+Z_Final%20(1).pdf)
정말 반가운 발표였다. PINSAGE를 이용한 추천시스템으로 유저의 '취향'을 고려하여 장소를 추천해주는 HyperLocal 추천시스템이었다. 이 팀은 2016년부터 '취향'을 토대로 유저에게 장소를 추천해주는 연구를 해온 점이 놀라웠다.

![Screenshot](../../assets/img/blog/hyperLocal_2016.jpg)

## 16:00 ~ 16:45
[이제는 AI가 읽고(Language), 보고(Vision), 생성하는 Large-scale Multimodal의 시대입니다](https://deview.kr/data/deview/session/attach/[125]%EC%9D%B4%EC%A0%9C%EB%8A%94+AI%EA%B0%80+%EC%9D%BD%EA%B3%A0(Language),+%EB%B3%B4%EA%B3%A0(Vision),+%EC%83%9D%EC%84%B1%ED%95%98%EB%8A%94+Large-scale+Multimodal%EC%9D%98+%EC%8B%9C%EB%8C%80%EC%9E%85%EB%8B%88%EB%8B%A4.pdf)


## 17:00 ~ 17:45
[언어 모델 기반의 범용 유저 임베딩과 이를 활용한 추천시스템 및 광고 타겟팅](https://deview.kr/data/deview/session/attach/[126]%EC%96%B8%EC%96%B4+%EB%AA%A8%EB%8D%B8+%EA%B8%B0%EB%B0%98%EC%9D%98+%EB%B2%94%EC%9A%A9+%EC%9C%A0%EC%A0%80+%EC%9E%84%EB%B2%A0%EB%94%A9%EA%B3%BC+%EC%9D%B4%EB%A5%BC+%ED%99%9C%EC%9A%A9%ED%95%9C+%EC%B6%94%EC%B2%9C%EC%8B%9C%EC%8A%A4%ED%85%9C+%EB%B0%8F+%EA%B4%91%EA%B3%A0+%ED%83%80%EA%B2%9F%ED%8C%85.pdf)

# PREVIOUS
[나 대신 손글씨 써주는 AI 만들기 (성공적인 Side Project)](https://deview.kr/2019/schedule/294)

# 총평
다녀와서 좀 충격에 휩싸여 있었다. 네이버 연사로 나온 개발자들과 지금의 나의 격차가 나는 것은 당연하지만, 그 정도가 눈 앞이 캄캄할 정도로 멀게만 느껴졌다. 이대로 괜찮을까하였다. 그들이 만약 여러 나라 유명한 호텔의 쉐프들이라면 나는 프랜차이즈 식당에서 키트로 요리하는 알바생처럼 느껴졌다. 두 가지 글이 큰 도움이 되었다. 

[어제보다 더 나은 오늘] 카카오 김범수 의장이 좋아하는 글귀로 알고 있다. 

[오늘 보다 더 나은 내'일'] 우아한형제들의 '이게 무슨 일이야'의 글귀이다.

멀리 보지 않고 이전처럼 한 걸음, 한 걸음 나아가는 것에 흥미를 두기로 했다.

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
