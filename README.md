# KUL:MATE 🏠

> 건국대학교 기숙사생을 위한 맞춤형 룸메이트 매칭 서비스

기존 커뮤니티에서 파편화된 형태로 이루어지던 룸메이트 구인 과정을 체계화하여, **기숙사 생활 스타일 지표**를 기반으로 최적의 룸메이트를 탐색하고 매칭할 수 있는 플랫폼입니다.

<br>

## 주요 기능

- **회원가입 및 인증** — 건국대 웹메일 인증 + 기숙사 합격증 이미지 업로드를 통한 관리자 수동 승인
- **생활 스타일 설문** — 수면 시간, 소음 민감도 등 지표 기반 본인 및 선호 룸메이트 설문 작성
- **구인글** — 설문 데이터를 바탕으로 한 구인글 작성·조회·수정·삭제 및 북마크
- **룸메이트 추천** — 선호 설문과 80점 이상 적합도를 기준으로 한 맞춤 추천
- **필터 검색** — 생활관, 흡연 여부 등 세부 조건 기반 필터링 검색
- **실시간 채팅** — WebSocket/STOMP 기반 1:1 실시간 채팅
- **룸메이트 신청** — 신청·수락·거절·해지 처리 및 알림

<br>

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Spring Boot, Spring Security, JPA |
| Database | MySQL |
| Real-time | WebSocket / STOMP, Redis Pub/Sub |
| Auth | JWT |
| Infrastructure | AWS EC2, Docker, Nginx |
| Email | SMTP |

<br>

## 실행 방법

별도 설치 없이 아래 링크에서 바로 이용할 수 있습니다.

👉 **[https://kul-mate.vercel.app](https://kul-mate.vercel.app)**

<br>

## 팀원 소개

| 이름 | 역할 |
|------|------|
| 문효진 (팀장) | 백엔드 및 인프라 |
| 김도은 | 프론트엔드 |
| 정화진 | 프론트엔드 |
