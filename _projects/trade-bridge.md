---
title: trade-bridge
subtitle: LLM이 실시간 금융 데이터를 직접 조회·조합하게 만든 57개 tool MCP 서버 — 1인 개발 · 배포
description: 미국 주식 리서치 MCP 서버(Python FastMCP, 57개 tool)와 계정·키 발급 웹 대시보드. 거시지표 → 섹터 → 종목 Top-down 리서치, DCF·옵션 체인 분석, 환경변수 하나로 바꾸는 인증 모드.
order: 21
track: side
featured: false
domains: [llm]
period: 2026.04 – 운영 중
role: 1인 프로젝트 — 기획 · 개발 · 인프라 · 배포
status: 배포 완료 · 본인과 지인 소수 사용 중
service_url: https://www.trade-bridge.cloud/dashboard/guide
taste_signal: '흩어진 금융 데이터 6종을 LLM 에이전트가 바로 조회 · 조합할 수 있는 57개 tool 스키마로 정리한 경험'
stack: [Python, FastMCP, Streamable HTTP, Docker, Nginx, Oracle Cloud, Next.js, Vercel, Supabase Auth, yfinance, FRED, SEC EDGAR]
metrics:
  - value: "57개"
    label: MCP tool (+1 resource)
  - value: "6종"
    label: 외부 데이터 소스
  - value: "무료 티어"
    label: 실사용 검증 전까지 Always Free 인프라
links:
  - label: 이용 가이드
    url: https://www.trade-bridge.cloud/dashboard/guide
  - label: 서비스 홈
    url: https://www.trade-bridge.cloud/
  - label: 내가 쓰려고 만든 미국 투자 MCP (블로그)
    url: /post/ml-dl/2026-04-17-Oh-my-investment_mcp_tools/
---

## 한 줄로

매크로 → 섹터 → 종목 순으로 좁혀 가는 Top-down 리서치로 투자 공부와 실전 의사결정을 함께 하고 싶었는데, **LLM이 실시간 금융 데이터를 구조화된 형태로 조회·조합할 수 있는 도구 세트**가 없었습니다. 그래서 MCP 서버를 직접 설계했습니다.

## 구조 — 두 축으로 역할 분리

- **MCP 서버 (리서치 엔진)** — Python FastMCP, 57개 tool + 1개 resource. 종목 재무·밸류에이션, 거시경제 지표, 섹터·테마 모멘텀, SEC 공시, DCF, 옵션 체인(감마 익스포저) 분석. 데이터 소스는 yfinance · Alpha Vantage · FRED · Tradier · SEC EDGAR · Damodaran dataset. Oracle Cloud Always Free VM 위 Docker + Nginx/HTTPS로 Streamable HTTP 엔드포인트를 노출합니다.
- **Web (계정 · 키 발급)** — Next.js + Vercel, Supabase Auth. MCP 연결에 필요한 키 발급과 연결 가이드만 담당하고, OAuth 인가 서버 역할도 겸합니다.

## 주요 판단

- **리서치 도구 먼저, 개인화는 나중에** — 처음엔 둘을 한 번에 만들려다 범위가 커지는 걸 보고, 리서치 도구(Phase 1)를 먼저 완성하고 개인화(Phase 2)는 선택 계층으로 분리했습니다.
- **확장을 가정하지 않는 인프라** — 무료 티어로 시작해 실사용을 검증한 뒤 유료 전환을 검토합니다.
- **인증 모드는 환경변수 하나로** — 배포 규모가 바뀌어도 코드 변경 없이 정책만 바꾸면 되도록 처음부터 분리했습니다.
- **도메인 검증은 현업에게** — 현업 주식 트레이더의 피드백으로 DCF · 펀더멘탈 분석 로직을 보정했습니다.

## 효과 — 같은 질문, 다른 결론

같은 종목에 대해 도구 없이 물었을 때 LLM은 애널리스트 컨센서스만 보고 "Strong Buy"를 냈지만, trade-bridge를 연결하면 펀더멘탈 점수 · 일봉/주봉 타이밍 · 옵션 감마 구간(콜월 저항, max pain)을 함께 조합해 **"관망 — 특정 가격 돌파 또는 지지 확인 후 진입"** 이라는 조건부 결론을 냈습니다. 단편적인 검색이 아니라 구조화된 데이터를 조합하게 만드는 것이 도구 설계의 핵심이라는 걸 확인한 사례입니다.

## 써보기 — MCP 커넥터로 연결

trade-bridge는 웹앱이 아니라 **MCP 서버**라서, 쓰는 AI 클라이언트(예: Claude)에 커스텀 커넥터로 추가해야 합니다.

1. 클라이언트의 커넥터 설정에서 **커스텀 커넥터 추가**를 누릅니다.
2. 이름에 `trade-bridge`, URL에 `http://mcp.trade-bridge.cloud/mcp`를 입력하고 **계속**을 누릅니다.
3. 자세한 연결 방법은 [이용 가이드](https://www.trade-bridge.cloud/dashboard/guide)에 있습니다.

## 한계

사용자는 본인과 지인 소수입니다. 이 프로젝트의 핵심은 사용자 수가 아니라 **MCP 서버 아키텍처와 LLM용 도구 설계** 경험에 있습니다. 투자 자문이 아닌 데이터 기반 참고 도구입니다.
