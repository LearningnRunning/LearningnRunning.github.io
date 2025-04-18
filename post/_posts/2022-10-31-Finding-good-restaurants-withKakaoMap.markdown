---
layout: post
title:  "카카오맵 하나로 괜찮은 맛집 찾기"
date:   2022-10-22 11:11:11 +0900
categories: data-analytics
description: >
  카카오맵을 활용하여 괜찮은 맛집을 찾는 방법에 대한 고찰
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/4dfb8597-3d10-4aab-bc6a-c8a17cf7c836/image.jpg
author: LearningnRunning
keywords: 맛집, 카카오맵, 음식점 추천, 평점 분석, 리뷰 분석, 데이터 기반 추천
seo:
  date_modified: 2022-10-31
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8
---
# 카카오맵 하나로 괜찮은 맛집 찾기

# 1. 네이버지도를 쓰지 않는 이유
![](https://velog.velcdn.com/images/sungrok7/post/4dfb8597-3d10-4aab-bc6a-c8a17cf7c836/image.jpg)
네이버 지도의 평점은 기본이 4점 이상이기에 평점 데이터만으로는 맛집을 골라내기가 힘들다.그래서 필자는 리뷰 외에 데이터로 변별하기위해서 카카오맵을 주로 쓴다.

# 2. 달라진 카카오맵
![](https://velog.velcdn.com/images/sungrok7/post/3bbf9d54-57e8-49cd-b122-67c875cfcaa6/image.png)
평점만으로 괜찮은 음식점인지 판단할 때 가장 주의해야할 점은 광고 리뷰 여부 판단이다. 네이버 뉴스와 다음 뉴스의 리뷰어 정보에서도 마찬가지인 차이인데 네이버와 달리 다음과 카카오는 리뷰어의 다른 정보를 알 수 있다. 이번에 업데이트된 점에서도 그런 변화가 제일 크다. 해당 리뷰를 남긴 사람이 어떤 리뷰 성향인지 알 수 있다. 그런 성향은 광고 리뷰어인지 아닌지 판단하는 데에 좋은 단서가 된다.

## 1) 인간카카오맵
내가 사는 지역도, 연고도 없는 곳이지만 서울 어느 곳에서 괜찮은 음식점 아는 데가 있냐고 묻는 지인들이 많다. '취향식탁' 프로젝트를 하고 있다고 동네방네 소문 내고 난 뒤에는 맛집 찾는 기계로 생각하는 거 같아, 내가 찾는 형태의 기반으로 RESTAPI 형태로 만들어 보고 있다. 

### 가) 카카오맵에서 빠르게 지역 맛집을 찾는 방법
1. 음식점 평균 평점이 3.5 이상
2. 개인 평균 평점이 3.5점 이하인데 해당 음식점에 4점이상 준 인원이 많은 순(깐깐한 리뷰어의 후한 점수)
3. 개인 평점이 4점 이상인데 해당 가게에 2점 이하를 줬다면 제외(불호 다수) 

> 1번 조건의 음식점 중에서 3번 조건에 해당하지 않고 2번 조건의 리뷰어들이 많은 순으로 정렬하기

```sql
SELECT * 
FROM matkimatki.test1 
where score_min >= 3.5
and rate <= 3.5
and reviewAt >= 4;
// 3번 조건과 row 개수 기반 정렬을 보충해야한다.
```

# 3. 추가할 기능
추가로 INPUT 하고 싶은 것은 카테고리와 태그가 있다.

## 1) 카테고리
![](https://velog.velcdn.com/images/sungrok7/post/fa8b4701-98ae-430d-b363-26790ba65a5b/image.png)
카카오맵에서 국밥, 해장국, 삼겹살과 같이 업태를 나누어 놨다. 업태를 추가로 입력해주면 그 업태 중에서만 가)의 목록을 뿌려준다. 


## 2) LikePoint
카카오맵에서 추가한 기능인 LikePoint(맛, 분위기, 친절 등등)를 INPUT 값으로 추가해주면 가) 에서 정렬된 값 중에서 그 LikePoint가 있는 음식점을 우선적으로 뽑아 뿌려준다.
![](https://velog.velcdn.com/images/sungrok7/post/7f737dbe-bdda-48b8-9708-880fb245f92d/image.jpg)

지금 삼성역 주변으로 데모버전을 만들고 있지만 지인들이 요청하는 지역으로 스크래핑을 해와서 점차 범위를 넓히어 가려고 한다. 

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
