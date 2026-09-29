---
title: Dear J
subtitle: 프로젝트 백로그와 '오늘 할 일'을 잇는 일정관리 앱 — 방치를 막는 행동 유도 설계
description: 매일 오늘 할 일을 고르고(Pick) 시작·회고·마무리하는 '오늘' 루틴 중심 일정관리 앱. 3회 연속 미룬 항목은 회고에서 스킵할 수 없게 한 설계, Flutter 원본을 React/TS로 재구현.
order: 23
track: side
featured: false
domains: [product]
period: 2026 – 비공개 베타
role: 1인 프로젝트 — 기획 · 설계 · 구현 · 인프라
status: 웹(SPA) 비공개 베타 · iOS 위젯 개발 중
taste_signal: '사용자의 반복 행동(미루기)을 관찰해 제품 규칙으로 바꾼 설계 — 행동 기록이 곧 제품의 입력'
stack: [React 18, TypeScript, Vite, Tailwind, Supabase (Postgres · Auth · RLS), Vercel, React Native, WidgetKit]
metrics:
  - value: "3회"
    label: 연속 미루면 회고에서 강제 노출
  - value: "Flutter → React"
    label: 검증된 로직 유지 · 재구현
links:
  - label: Flutter 버전
    url: https://dear-j-20260514.web.app/
---

## 한 줄로

여러 프로젝트가 동시에 굴러가면 "프로젝트 단위 정리"와 "하루 단위 실행" 사이에 간극이 생겨 일을 마무리하지 못합니다. 제 자신의 문제에서 출발해, **저를 첫 사용자로 삼아** 만든 일정관리 앱입니다.

## 제품의 본체는 '오늘' 루틴

매일 오늘 할 일을 고르고(Pick), 하루를 시작 · 회고 · 마무리하는 루틴 자체가 제품이라고 보고 설계했습니다.

- **3회 연속 미룬 항목은 회고 단계에서 강제로 노출되어 스킵할 수 없습니다.** 매일 직접 쓰면서 방치되는 항목이 계속 눈에 띄었고, 그 관찰이 이 규칙이 됐습니다. 죄책감을 쌓지 않으면서도 방치를 막는 행동 유도 관점의 판단입니다.

## 기술 판단

- **재작성 대신 재구현** — Flutter로 만든 원본 앱의 검증된 로직은 유지하고 프레젠테이션 레이어만 React/TS로 다시 만들었습니다.
- **상태관리는 직접 설계** — Redux · Zustand를 검토했지만 규모에 비해 과하다고 보고, Context + useReducer로 도메인별 책임을 나눴습니다.
- Supabase(Postgres + Auth + RLS), Vercel 배포. iOS 위젯(React Native + WidgetKit)을 진행 중입니다.

## 한계

본인과 지인 소수가 쓰는 비공개 베타로, 사용 지표는 없습니다. 핵심은 1인으로 기획부터 배포까지 완결한 실행력과 행동 유도 관점의 제품 설계에 있습니다.
