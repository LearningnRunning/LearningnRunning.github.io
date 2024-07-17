---
layout: post
title:  "카카오록에서 머먹이 되기까지"
date:   2024-03-03 19:11:11 +0900
categories: Tech review
description: >
  데이터 분석 결과만으로 찐맛집 찾기 프로젝트
image: 
  path: /assets/img/blog/fromkakaorokTowhat2eat.png
---
지난 포스팅 [**카카오맵 하나로 괜찮은 맛집 찾기**](https://learningnrunning.github.io/example/tech/review/2022-10-22-Finding-good-restaurants-withKakaoMap/) 이후 계속해서 작업을 해왔고 어느 정도 프로토타입을 완성하여, 정리 겸 글을 써본다.

자타공인 인간 카카오맵인 내가 맛집을 찾을 때면, 해당 지역에서 ‘맛집’을 검색한 후 음식점 평균 평점이 3.5 이상이 되는 맛집들을 하나씩 살펴본다. 리뷰를 중점으로 봐왔지만 개인의 평균평점이 노출되는 카카오맵의 업데이트 이후 평점을 위주로 봐왔다. 그걸 자동화 해봤다.

## 분석 방법
> 만족한 유저와 불만족한 유저 수를 계산하여 노출하기

![Screenshot](../../assets/img/blog/ai_snap/What2Eat_AnalysisMethods.png){:.lead width="1920" height="1080" loading="lazy"}

1. 유의미한 호(好) 리뷰 찾는 방법

먼저 카카오맵에서 서울에 있는 음식점 4만6천 여개에서 104만7천 여개의 리뷰 데이터를 준비했다. 수집한 데이터에는 리뷰뿐만 아니라 유저의 평균 평점, 유저가 해당 음식점에 남긴 평점도 있었다. 유의한 호 리뷰를 찾는 방법은 유저의 평균보다 높은 평가를 했다면  유저 개인의 평균 평점보다 유저가 해당 음식점에 더 높은 평점을 남겼다면 그 음식점에 만족을 했다고 보는 방법이다.

* 쩝쩝박사 - 유의미한 호(好) 리뷰어 인원

* 쩝쩝퍼센트 - (유의미한 호(好) 리뷰어 수/ 전체 리뷰어 수) * 100

##### **화면 노출 조건**

쩝쩝박사 인원 수가 5명이 넘는 음식점 중에서 쩝쩝 퍼센트가 높은 순으로 목록을 제공됩니다.

2. 유의미한 비호(非好) 리뷰 찾는 방법

개인의 평균 평점이 3.5 이상인 유저가 해당 음식점에 1.5점 이하로 별점을 남겼다면 그 음식점에 불만족을 했다고 보고 유의미한 비호(非好) 리뷰어라고 판단

* 비호퍼센트 - 유의미한 비호(非好) 리뷰어 수 / 전체 리뷰어수 * 100

##### **화면 노출 조건**

비호퍼센트가 10프로 넘으면 호(好) 화면 노출 조건에 맞더라도 비호퍼센트를 노출하며 주의를 줍니다.

## UI/UX 고민

### 프롬프트 버전(카카오록)

프롬프트 버전으로 가장 간단하게 구현해봤다. 가장 빨리 만들 수 있는 방법이었고 먼저 팀 내에서 사용할 목적이었기 때문이다. 바로 지도가 필요하다는 피드백이 왔다.

![Screenshot](../../assets/img/blog/prompt_kakaorok.png) 

### Streamlit으로는 한계인 지도 기반 버전

처음엔 지도 기반으로 개발 하였다. 이는 Streamlit 프레임워크로 개발하기엔 한계점인데, 그 이유는 앱에서 사용하기가 불편하기 때문이다. 그래서 여전히 Web 버전으로 남겨두었다. 그리고 이때 데이터를 읽어들이는 과정에서 개선을 하기 위해, 하루 해커톤을 하였고 이 과정에서 kakaoRok이 아닌 What2Eat으로 명칭을 변경하였다.

![Screenshot](../../assets/img/blog/ai_snap/what2eat_map_ver.png)

### 채팅 형식의 UX로 바꾼 이유

앱에서 이용하기 불편한 이유에서인지  What2Eat을 소개한 친구들도 여전히 나한테 맛집을 물어보는 친구들이 많았다. 카톡으로 여러 맛집을 이름/링크/추천이유를 보내던 중, What2Eat도 친구에게 보내주듯 구현하면 어떨까 아이디어가 떠올라. 친구가 알려주는 맛집 리스트 개념으로 UX를 잡았다.

![Screenshot](../../assets/img/blog/ai_snap/What2Eat_Examplescreen.png){:.lead width="1920" height="1080" loading="lazy"}
<br/><br/>

# 결과
[What2Eat_Chat(채팅 기반)](https://what2eat-chat.streamlit.app/)<br/>
[What2Eat(지도 기반)](https://what2eat.streamlit.app/)<br/>
[What2Eat 소스코드](https://github.com/LearningnRunning/What2Eat/tree/main)<br/>

## What2Eat 믿고 직접 찾아 가보기

### 신촌에서
![Screenshot](../../assets/img/blog/what2eat_review.png){:.lead width="1920" height="1080" loading="lazy"}
날씨가 추워 많이 걷지 못하여, 500미터로 하였고 좋아하는 카테고리를 모두 골라보았다. 평점을 남긴 사람 중에 절반 가까이가 솔직한 평가인 쩝쩝박사가 인증한 곳이다. 신촌에 1년 넘게 산 적이 있는데 그 당시에도 있었을 법했고 살던 곳 근처인데도 몰랐던 맛집이라 신기했다. 결과는 대만족이었다… 

‘What2Eat(머먹)’으로 찾은 곳은 신기하게도 그 음식점 주변은 조용한데, 그 음식점만 바글바글 사람이 많다.

### 선릉에서
![Screenshot](../../assets/img/blog/pongyear_1.png){:.lead width="1920" height="1080" loading="lazy"}
같이 개발 공부하던 친구들이랑 번개 일정이 잡혀서 급하게 머먹으로 찾았는데 대성공이었다. 연거푸 '진짜 맛있다'는 친구들의 평가에 머먹의 뿌듯함을 한껏 느꼈다. 번개를 친 다음주에 또 갔고 이번에도 같이 간 일행들이 모두 만족하였다.

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/