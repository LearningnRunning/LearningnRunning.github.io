---
layout: post
title:  "리눅스에서 `crontab`으로 반복 작업 자동화하기 "
date:   2025-04-17 12:16:09 +0900
categories: [engineering]
description: >
  주기적인 데이터 처리 작업을 자동화하는 방법
image: 
  path: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR66FyYBvwDfT5R8UQNCqk4o1i4wvMQzj50NCphTLlGD3FL7WbSKORgDdJ_6002YpvCP-E&usqp=CAU
author: LearningnRunning
keywords: crontab
seo:
  date_modified: 2025-04-17
  type: BlogPosting
sitemap:
  changefreq: monthly
  priority: 0.8


---

# 리눅스에서 `crontab`으로 반복 작업 자동화하기  

**크롤링 데이터 DB 업데이트 자동화 사례로 배우는 실전 활용법**

안녕하세요. 이 글에서는 리눅스의 `crontab`을 활용하여 **주기적인 데이터 처리 작업을 자동화하는 방법**을 소개드립니다.  

매시간마다 축적되는 크롤링 데이터를 매일 5시에 데이터베이스에 반영하고 parquet 백업을 수행하는 작업을 `crontab`으로 진행 했습니다.

---

## ✅ `crontab`이란?

`crontab`은 리눅스 및 유닉스 계열 운영체제에서 **정해진 시간마다 자동으로 명령어나 스크립트를 실행**할 수 있도록 예약하는 기능입니다. 대표적인 활용 예시는 다음과 같습니다.

- 주기적인 데이터 수집 및 처리
- 로그 정리 및 백업
- 자동 메일 발송

---

## 🖥️ 사용 가능한 운영체제

| 운영체제 | 지원 여부 |
|----------|:-----------:|
| Ubuntu (예: 20.04, 22.04) | ✅ |
| Debian 계열              | ✅ |
| CentOS, RHEL 계열        | ✅ |
| macOS (launchd로 대체 가능) | ✅ |
| Windows                  | ❌ (WSL이나 작업 스케줄러로 대체 가능) |

---

## ⏰ 시간 설정 형식과 예시

크론탭은 다음과 같은 5개의 필드로 시간 조건을 지정합니다.

```
분(0–59) 시(0–23) 일(1–31) 월(1–12) 요일(0–7, 0 또는 7은 일요일) 실행할명령어
```

### 🎯 주요 예시

| 설명 | 크론탭 표현 | 예시 |
|------|-------------|------|
| 특정 시간에 실행 | `30 8 * * 1` | 매주 월요일 오전 8시 30분 |
| 반복 실행 (매시 0, 20, 40분) | `0,20,40 * * * *` | 매시간 0분, 20분, 40분 |
| 범위 + 반복 실행 | `0,20,40 8-22 * * *` | 매일 오전 8시~오후 10시 사이 0,20,40분 |
| 간격 실행 (30분마다) | `*/30 * * * *` | 매 30분마다 |

---

## 📝 crontab 등록 방법

### 1. 크론탭 편집

```bash
crontab -e
```

### 2. 시간 및 실행할 명령어 추가

- 매일 오전 5시에 run_daily_update.sh를 실행

```bash
0 5 * * * . /home/your_user/project/run_daily_update.sh
```

### 3. 등록된 크론탭 확인

```bash
crontab -l
```

---


## 📦 자동화 스크립트 작성 예시

다음은 데이터 로딩 및 백업을 수행하는 스크립트입니다.

**`/home/your_user/project/run_daily_update.sh`**

```bash
#!/bin/bash

# 환경 변수 설정
export HOME=/home/your_user
export PATH="/home/your_user/.pyenv/versions/your_env_name/bin:/usr/bin:/bin"

# 현재 시간 기준 로그 파일명 설정
NOW=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="/home/your_user/project/logs/update_${NOW}.log"

echo "===== 데이터 업데이트 시작: $(date) =====" | tee -a "$LOG_FILE"

cd /home/your_user/project
source /home/your_user/.pyenv/versions/your_env_name/bin/activate

# Python 스크립트 실행 및 로그 저장
{
    python -u load_data.py
} 2>&1 | tee -a "$LOG_FILE"

echo "===== 데이터 업데이트 완료: $(date) =====" | tee -a "$LOG_FILE"

# 30일 이상된 로그 파일 삭제
find /home/your_user/project/logs -type f -name "update_*.log" -mtime +30 -delete
```

---

## 📘 로깅 방법

### tee를 이용한 방법
- 로그는 `tee` 명령어를 사용해 표준 출력과 동시에 로그 파일로 저장됩니다.
- 로그 파일은 `/home/your_user/project/logs/update_YYYYMMDD_HHMMSS.log` 형태로 저장됩니다.

### crontab에서 직접 로그 설정
- crontab 명령어 줄 안에 리디렉션(>, >>, 2>&1)을 활용하여 표준 출력과 에러 로그를 특정 파일로 저장

```bash
* * * * * /path/to/your/script.sh >> /path/to/logfile.log 2>&1
```

|기호 | 의미|
|:---:|:-----:|
|>> | 기존 로그 파일에 추가 (append)|
|> | 기존 로그 파일을 덮어쓰기 (overwrite)|
|2>&1 | 표준 에러(stderr)를 표준 출력(stdout)으로 함께 리디렉션|

---

## 📂 실제 로그 예시 (`update_20250413_195501.log`)

```text
===== 데이터 업데이트 시작: Sun 13 Apr 2025 07:55:01 PM KST =====
추가할 데이터 수 48400
Total records in CSV: 48,400

Fetching existing records for duplicate check...
Found 7,737,608 existing records

Found 1,147 duplicate records
Unique records to insert: 47,253

Inserting unique records...

  0%|          | 0/47253 [00:00<?, ?it/s]
 21%|██        | 10000/47253 [00:02<00:09, 3751.53it/s]
 42%|████▏     | 20000/47253 [00:05<00:07, 3583.72it/s]
 63%|██████▎   | 30000/47253 [00:08<00:04, 3595.00it/s]
 85%|████████▍ | 40000/47253 [00:10<00:01, 3669.71it/s]
100%|██████████| 47253/47253 [00:12<00:00, 3706.79it/s]

Data loading completed successfully!

Backing up inserted data to parquet files...
읽어들인 마지막 파트 파일: /home/your_user/project/data/parquet/qoo10_ranking_part8.parquet, 행 수: 734,516  
중복 제거 후 행 수: 781,769  
업데이트된 파일 저장: /home/your_user/project/data/parquet/qoo10_ranking_part8.parquet (781,769 행)

Final Database Statistics:
Total Records: 7,784,861
Date Range: 2024-10-29 to 2025-04-13
Unique Categories: 11

Backing up inserted data to another folder...
데이터 백업 완료
===== 데이터 업데이트 완료: Sun 13 Apr 2025 07:55:54 PM KST =====
```

---

## ✨ 마무리하며

`crontab`을 이용하면 반복적인 수작업을 자동화하여 작업 효율을 극대화할 수 있습니다.  
특히 데이터 크롤링, 백업, 정리 작업처럼 정기성이 있는 업무에 매우 적합합니다.

스크립트와 로그 체계를 함께 구성하면 **에러 대응**, **상태 모니터링**, **데이터 무결성 관리**에도 큰 도움이 됩니다.  
여러분도 crontab을 활용하여 자동화의 첫 걸음을 시작해보시길 추천드립니다!


[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/