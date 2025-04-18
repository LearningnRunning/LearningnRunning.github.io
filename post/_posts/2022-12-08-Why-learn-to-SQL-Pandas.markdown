---
layout: post
title:  "SQL/Pandas를 배워야하는 이유"
date:   2022-12-08 17:00:00 +0900
categories: engineering
description: >
  영화 스포트라이트의 사례를 통해 알아보는 SQL과 Pandas의 중요성
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/aa436f44-a399-427d-ac22-1ab84dd0825b/image.png
author: LearningnRunning
keywords: SQL, Pandas, 데이터분석, 데이터 처리, 데이터 추출, 영화 스포트라이트, 데이터 엔지니어링
seo:
  date_modified: 2022-12-15
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8
---
영화 [스포트라이트]에서 나오는 《더 보스턴 글로브 The Boston Globe》는 1990년대 말에 게오건 사건을 취재하기 시작했다. 게오건 신부는 30년 간 6개 교구를 옮겨 다니며 수십 명의 아동을 성추행 하였고 보스턴 교구장 버나드 로우 추기경은 이를 알고도 덮어준 것이었다. 스포트 라이트 팀은 이 같은 성범죄와 은폐가 게오건 1인이 아닌 여러 교구에 걸쳐 여러 사제들까지도 저질렀고 교구 차원에서 조직적으로 은폐해온 정황을 포착했다. 
![](https://velog.velcdn.com/images/sungrok7/post/aa436f44-a399-427d-ac22-1ab84dd0825b/image.png)

## 수치를 찾는 과정
팀장 로비는 13명의 비슷한 패턴을 보인 신부를 찾았다고 수치가 평균적인지 리처드 사이프(성추행 신부들과 피해자들을 30년 동안 연구한 전직 사제)에게 물었다. 사이프는 너무 적다며 6%가 미성년자와 성행위를 한다고 보고 있다고 했다. 신부 전체의 6%, 보스턴엔 1500명 정도의 신부가 있었고 6%는 90명의 추정치이다. 기사로 쓰기 위해 더 확실한 증거가 필요했다.
![](https://velog.velcdn.com/images/sungrok7/post/5e3b69bf-fbdd-4ec5-9e49-b0d46cddaf05/image.png)

메사추세스주(보스턴시가 속한 주)의 모든 신부과 소속교구와 교구 이동시 사유가 적힌 공식명부에서 "전출사유"가 **병가**, **미발령**이거나 전출이 잦은 신부 명단 리스트를 작성하기 시작한다.

![](https://velog.velcdn.com/images/sungrok7/post/c071de85-ea6f-4b7c-b817-c435e95061ae/image.png)

#### 4명의 직원이 며칠을 매달려 "전출사유"가 **병가**, **미발령**이거나 전출이 잦은 신부를 찾고 엑셀 작업하고 각자 찾은 리스트에 누락된 사람이 없는지 크로스 체크해서 얻은 인원수는 87명, 사이프의 추정치와 고작 3명 차이난다.
![](https://velog.velcdn.com/images/sungrok7/post/49b85b74-4015-42e3-853a-65298a594692/image.jpg)
#### 보스톤 글로브 구독자의 53%가 가톨릭 신자라서 스포트 라이트 팀은 기사를 내기 전에 정확한 데이터 수치가 필요했다. 만약 SQL이든 Pandas를 이용하여 빠르고 정확하게, 그리고 더 광범위하게 조사할 수 있었다면 어땠을까?
이 영화가 2016년에 아카데미에서 작품상, 감독상, 각본상, 편집상, 여우조연상, 남우조연상인 6관왕을 받았을 때에 봤는데 큰 요동 없는 감정선을 성추행 사건 중심으로 이어나가는 영화적 요소가 눈에 띄었다면 지금은 이런 개발적인 요소가 보인다. 

# SQL의 역사
pandas는 2009년에 오픈소스 형태로 처음 공개되었으니 어쩔 수 없지만 SQL은 그 당시에도 존재했다.

|SQL 표준|특징|
|---|---|
|SQL86|ANSI에서 제정한 최초의 표준|
|SQL92|대규모 개정 및 정리. 실질적인 첫 표준|
|SQL99|정규 표현식, 트리거, 절차적 흐름.|
SQL 문법만으로 보면 아직까지도 실질적인 표준은 SQL99이고 그 이후에는 AI, 빅데이터와 함께 활용하기 위한 업데이트였다.

다만, 공식명부를 파일데이터로 구할 수 없었다면, OCR 기술이 필요했을 것 같다.



[가톨릭 교회의 성적 학대 사건](https://ko.wikipedia.org/wiki/%EA%B0%80%ED%86%A8%EB%A6%AD_%EA%B5%90%ED%9A%8C%EC%9D%98_%EC%84%B1%EC%A0%81_%ED%95%99%EB%8C%80_%EC%82%AC%EA%B1%B4)
![](https://velog.velcdn.com/images/sungrok7/post/f52f7816-64a1-453d-9fa8-4009a722d5e8/image.png)

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
