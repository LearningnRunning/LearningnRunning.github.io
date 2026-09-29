---
title: Balance MakeUp · AI Snap
subtitle: 얼굴이라는 취향 신호로 만든 개인화 뷰티 서비스 — 대표의 한 줄 요청에서 출시까지
description: MediaPipe FaceMesh 기반 7가지 얼굴형·11가지 비율 분석 메이크업 추천(Balance MakeUp)과, 경쟁 서비스 분석으로 80일 만에 출시한 AI Snap.
order: 5
track: work
featured: true
domains: [beauty]
period: 2023.03 – 2023.12
role: 기획 · ML · 백엔드 (기획서 작성부터 배포 후 모니터링까지)
status: Checco 플랫폼 출시
confidential: true
confidential_note: 회사 프로젝트로, 서비스 성과 지표와 내부 모델 구성은 사내 정책상 공개하지 않습니다.
taste_signal: 사용자 얼굴의 비율·얼굴형·피부톤 → '나에게 맞는' 메이크업과 스타일
stack: [MediaPipe FaceMesh, OpenCV, PyTorch, TensorFlow, Stable Diffusion, FastAPI, Docker Compose, Nginx]
metrics:
  - value: "7 · 11"
    label: 얼굴형 분류 · 비율 측정 항목
  - value: "80일"
    label: AI Snap 기획 → 출시
  - value: "468"
    label: 얼굴 랜드마크 기반 분석
links:
  - label: 레퍼런스 없는 서비스, 기획부터 배포까지
    url: /post/engineering/2023-12-06-Reference-lessservices-fromplanningtodeployment/
  - label: 80일 안에 AI 서비스 배포하기
    url: /post/engineering/2023-12-20-Deploying-AI-services-in-80-days/
  - label: 귀신 피하려다가 호랑이 만나다
    url: /post/engineering/2023-08-05-.Startup-service-development-period-copy/
---

## 한 줄로

일본 대상 K-뷰티 플랫폼 Checco에서, 대표의 짧은 요청 두 개를 **각각 출시된 개인화 서비스**로 만든 경험입니다. 입사 5개월 차부터 기획서, 경쟁 서비스 조사, 전문가 협업, 모델, 서버, 배포 후 모니터링까지 맡았습니다.

## Balance MakeUp — "관상 서비스를 만들어보자"에서 시작

- **요청을 문제로 바꾸기** — 관상 판별은 얼굴 수치 탐지 이후에도 군집화와 관상 자체에 대한 학습이 필요해 길어질 프로젝트였습니다. 원래 요청의 의도가 "빨리 끝낼 수 있는 것"이었기에, 같은 기술로 **길이 측정만으로 가능한** 얼굴 비율 기반 메이크업 가이드를 대안으로 제안했습니다.
- **분석** — MediaPipe FaceMesh 468개 랜드마크 기반 7가지 얼굴형 분류, 악안면성형학 연구의 이상 비율을 참고한 11가지 비율 측정
- **추천** — 얼굴형·비율·피부톤(쿨/웜/뉴트럴)에 맞춘 컨투어링 위치와 메이크업 이미지 추천. 가이드 문구는 **메이크업 전문가와 협업**해 정리
- **서빙** — Docker Compose + Nginx + FastAPI로 병렬 처리, 스트레스 테스트 후 배포

## AI Snap — "하루빨리 AI 프로필 같은 걸"

- **리서치로 구현 구조 추정** — SNOW AI 프로필, Meitu, Carat을 리뷰하며 "생성이 아니라 옷·배경은 두고 얼굴만 바꾼다"는 가설을 세우고 그 구조로 기능을 설계
- **차별화** — 사계절 테마의 '스냅 사진' 콘셉트로 일회성 이용이 아닌 반복 방문을 유도
- **전처리 모델** — 정면 여부 판단, 얼굴 쪽 머리카락 제거, 눈가·팔자주름 제거 기능 개발, Stable Diffusion 기반 테마 이미지 생성
- **결과** — 80일 만에 출시, Qoo10 크리스마스 콜라보 진행

## 한계

Balance MakeUp은 별도의 정량 성과 지표를 측정하지 않았고, AI Snap의 서비스 성과 지표는 공개 범위에 포함하지 않았습니다. 두 서비스 모두 기획이 확정되기 전에 개발을 병행해 기능 수정이 많았습니다. 무엇이 어려웠고 다음에 무엇을 다르게 할지는 회고 글에 정리해 두었습니다.
