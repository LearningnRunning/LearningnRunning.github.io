---
layout: post
title:  "개발하고 달리 보이는 것"
date:   2022-08-08 21:07:11 +0900
categories: engineering
description: >
  개발자 시각에서 본 신한은행의 배달 앱 '땡겨요'와 발견한 버그
image: 
  path: https://velog.velcdn.com/images/sungrok7/post/8604b488-2927-4093-8f67-12d53529bf33/image.png
author: LearningnRunning
keywords: 배달앱, 땡겨요, 개발 오류, 데이터 오류, 맛스타오더, 버그 발견, 개발자 시각, 앱 리뷰
seo:
  date_modified: 2022-08-15
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8
---
### 개발하고 달리 보이는 것

### 신한은행에서 내놓은 배달어플 "땡겨요"
![](https://velog.velcdn.com/images/sungrok7/post/8604b488-2927-4093-8f67-12d53529bf33/image.png)
## 기본 배달어플과의 차이점
- 가맹점과 배달라이더에겐 더 적은 수수료를 책정하고 정산 주기도 짧아 현금 순환도 빠르다는 장점이 있는 듯하다.
- 이용자에겐 낮은 배달료와 지역사랑상품권을 적용할 수 있다는 장점이 있다. 그리고 서비스 초기 특성일 수도 있겠지만 쿠폰을 마구 뿌리고 있다. 

## 맛스타오더
- 기존 어플에서는 음식점마다 리뷰가 달리고 그 음식점이 괜찮은 곳일지 판단할 때 자료로만 쓰였다면 땡겨요에서는 리뷰를 커뮤니티성으로 묶었다. 
### 네이버 마이플레이스 + 장바구니 담기
- "취향식탁"에서도 주목하는 기능이기에 주의깊게 보았다. 
- 네이버 플레이스에 있던 팔로잉 기능에 더불어 리뷰어가 주문했던 메뉴를 바로 장바구니로 담는 기능을 더 했다.
- 같은 메뉴를 주문하더라도 맛스타 리뷰에서 담은 메뉴는 포인트를 추가로 지급하여 리뷰 쓰게끔 한다.

# 오류 발견
- 나도 기왕이면 반가운 기능으로 주문하려고 맛스타에서 장바구니로 담았다.
![](https://velog.velcdn.com/images/sungrok7/post/b1318d3b-90e0-4245-9320-228e48e323c1/image.png)

>
miyukhi 님이 주문했던 '쫄깃쫄깃~오늘삶은국내산앞다리' 메뉴가 내 장바구니로 바로 담긴 걸 볼 수 있다. 금액은 38,000원이고 이 분도 배달로 시켰기에 배달로 담겼다. 만약 포장 리뷰어라면 포장 할인이 자동으로 적용된다

## 리뷰 남겼을 때의 가격 정보
- 결제창으로 넘어가며 오류가 났다. 고객센터 전화해보니 상담원도 원인을 파악하지 못했다. 시험삼아 맛스타오더에서 메뉴를 담지 않고 메뉴 정보에서 담아봤다.
![](https://velog.velcdn.com/images/sungrok7/post/6646e1b1-8e91-4dfa-9fb6-df838540db6e/image.png)

- 맛스타오더에서 추가했을 때와 가격이 달랐다. 처음엔 할인이 적용된 줄 알았는데 어떤 식으로 해도 메뉴의 정보가 변경되었다는 안내가 나왔다. 
- 추측하는 바로는 맛스타 리뷰어가 리뷰를 남겼을 때 메뉴의 가격 데이터가 그대로 넘어오는 오류가 아닐까싶다. 결제 창에서 대조할 가격과 다르기 때문에 가격창에서 오류가 나는 것이 아닐까? 
- 고객센터에 남겨놓았으니 추후 버그가 수정되었는지 봐야겠다.

> 데이터를 어떻게 끌어쓰고 백단에서 어떻게 움직이는지 몰랐다면.. 상담사와 계속 해결하지 못한 채 있었을텐데 개발을 배워서 다행이라 생각했다. 

### p.s. 족발은 넘 맛있었당... 

![](https://velog.velcdn.com/images/sungrok7/post/c0eebfff-7454-4107-b3ad-602adf862891/image.jpg)


# 후기 
- 이후 맛스타오더에 긴급공지로 떴다.
![](https://velog.velcdn.com/images/sungrok7/post/ba6abdee-6c21-4b63-8315-d78a3369aa07/image.png)



[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
