# KUL:MATE — Project Context

> 이 문서는 어떤 LLM에 질문하든 일관된 맥락을 제공하기 위한 프로젝트 컨텍스트 파일입니다.
> 코드 작성, 설계 검토, 기능 구현 등 모든 요청 시 이 파일을 첨부하세요.

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | KUL:MATE |
| 과목 | 2026-1 전공심화프로젝트 (건국대학교 컴퓨터공학부) |
| 팀 구성 | 3인 팀 — 백엔드 1명, 프론트엔드 2명 |
| 서비스 유형 | 웹 애플리케이션 |

KUL:MATE는 건국대학교 기숙사생을 위한 맞춤형 룸메이트 매칭 서비스다.
기존에 커뮤니티 게시판 등에서 파편화된 형태로 이루어지던 룸메이트 구인 과정을 체계화하여,
생활 패턴과 선호도를 기반으로 최적의 룸메이트를 탐색하고 매칭할 수 있도록 돕는 플랫폼이다.

---

## 2. 해결하는 문제

기존 건국대 기숙사 배정 방식은 수면 시간·소음 민감도 등 구체적인 생활 습관을 반영하지 못한 채
무작위로 이루어져 입사생 간 갈등을 유발해 왔다. 또한 기존 커뮤니티 구인글은 통일된 형식 없이
작성되어 정보 탐색의 비효율과 매칭 전후 정보 불일치로 인한 피로도가 높았다.

KUL:MATE는 다음 방식으로 이 문제를 해결한다.

- **표준화된 17가지 생활 지표 설문** 도입 → 주관적 성향 묘사 의존에서 탈피
- **필터링 + 적합도 기반 추천(80점 이상)** → 탐색 시간과 스트레스 절감
- **애플리케이션 내 1:1 실시간 채팅 + 매칭 신청 흐름** → 커뮤니티 DM 의존 제거

---

## 3. 사용자 유형

| 유형 | 설명 | 접근 가능 기능 |
|------|------|----------------|
| 일반 사용자 (승인 완료) | 웹메일 인증 + 기숙사 합격 증빙 제출 후 관리자 최종 승인 완료 | 모든 핵심 기능 |
| 승인 대기 사용자 | 이메일 인증 완료, 관리자 승인 대기 중 | 설문 작성/수정, 구인글 조회만 가능 |
| 관리자 | 합격 증빙 수동 검토, 신고 처리, 통계 확인 | 관리자 대시보드 전용 기능 |

---

## 4. 구현 범위

### 4.1 MVP (이번 학기 구현 대상)

우선순위 **상(Must Have)** 및 **중(Should Have)**에 해당하는 기능 전체.

| 기능 ID | 기능명 | 우선순위 |
|---------|--------|----------|
| F-01 | 회원가입 (웹메일 인증 + 합격증 이미지 업로드) | 상 |
| F-02 | 로그인 | 상 |
| F-04 | 사용자 승인 (관리자 수동 승인/반려) | 상 |
| F-07 | 나의 기숙사 생활 스타일 설문 작성 | 상 |
| F-08 | 선호하는 룸메이트 생활 스타일 설문 작성 | 상 |
| F-10 | 룸메이트 구인글 작성 | 상 |
| F-14 | 룸메이트 구인글 조회 | 상 |
| F-16 | 사용자별 추천 기능 (적합도 80점 이상) | 상 |
| F-19 | 채팅 (1:1 실시간) | 상 |
| F-20 | 룸메이트 신청 | 상 |
| F-21 | 룸메이트 해지 | 상 |
| F-22 | 알림 (신청/수락/거절/해지) | 상 |
| F-09 | 설문 수정 | 중 |
| F-11 | 구인글 수정 | 중 |
| F-12 | 구인글 공개/비공개 설정 | 중 |
| F-13 | 구인글 삭제 | 중 |
| F-17 | 검색 | 중 |
| F-18 | 필터 | 중 |

### 4.2 확장 기능 (Nice to Have, MVP 이후 검토)

회원 정보 수정(F-05), 회원 탈퇴(F-06), 구인글 북마크(F-15), 신고(F-23),
신고 내역 처리(F-24), 매칭 통계(F-25), 캘린더 조회/등록(F-26, F-27)

### 4.3 구현하지 않는 범위

- 공식 기숙사 시스템 및 합격자 명단 자동 연동
- 소셜 로그인 (카카오, 네이버 등)
- 캘린더 학교 시스템 연동
- 실제 기숙사 배정 시스템 연동 (매칭 후 공식 기숙사 홈페이지 신청은 사용자가 직접 수행)

---

## 5. 아키텍처

### 5.1 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, Axios, STOMP/SockJS |
| Backend | Spring Boot, Spring Security, Spring Data JPA |
| Database | MySQL |
| Real-time | WebSocket / STOMP + Redis Pub/Sub |
| Cache | Redis |
| Web Server | Nginx (Reverse Proxy) |
| Infra | AWS EC2, Docker (컨테이너 단위: Spring Boot / MySQL / Redis / Nginx) |
| File Storage | EC2 Local File Storage (합격증 이미지 임시 저장, 승인/반려 후 즉시 삭제) |
| Auth | JWT + Spring Security (역할 기반 접근 제어) |
| Email | SMTP (건국대 웹메일 인증번호 발송) |

### 5.2 시스템 구성

```
[Frontend / Client]
    │
    │  HTTPS REST API + JWT
    │  WebSocket / STOMP 연결
    ▼
[Nginx Reverse Proxy]  ── AWS EC2, Docker
    │
    ├──▶ [Spring Boot API Server]
    │         │
    │         ├── JPA ──▶ [MySQL Container]
    │         ├── Pub/Sub ──▶ [Redis Container]
    │         ├── 합격 이미지 임시 저장 ──▶ [EC2 Local File Storage]
    │         │   (승인/반려 후 즉시 삭제)
    │         └── 이메일 인증번호 발송 ──▶ [SMTP Server]
    │
    └──▶ [WebSocket / STOMP]
              │
              └── Pub/Sub ──▶ [Redis Container]
```

### 5.3 인증 및 권한 구조

- JWT 기반 Stateless 인증, Spring Security로 역할 기반 접근 제어
- 프론트엔드: Authorization Header로 토큰 관리, Axios 인터셉터 패턴 적용
- 사용자 역할: `role: "USER" | "ADMIN"`
- 승인 상태: `status: "PENDING" | "APPROVED" | "REJECTED"`
- 온보딩 완료 여부: `isOnboardingCompleted: boolean`

### 5.4 주요 데이터 흐름

**회원가입 및 승인 흐름**
```
회원가입 입력 → 웹메일 인증 요청 → SMTP 인증번호 발송 → 인증 확인
→ 합격 증빙 이미지 업로드 (EC2 로컬 임시 저장)
→ 관리자 승인/반려 → 사용자 상태값 반영 → 증빙 이미지 즉시 삭제
→ 승인 완료 시 구인글 작성 및 신청 기능 활성화
```

**추천 및 채팅 흐름**
```
생활 스타일 설문 작성 → 설문 데이터 저장
→ 추천 API 호출 → 서버 적합도 점수 계산 → 추천 구인글 반환
→ 구인글 열람 → WebSocket/STOMP 기반 1:1 채팅
→ Redis Pub/Sub 메시지 중계 → 채팅 데이터 MySQL 저장
→ 룸메이트 신청 → 상대방 알림 → 수락 시 매칭 완료
→ 매칭 완료 시 양측 구인글 자동 비공개 전환
→ 해지 또는 탈퇴 시 상대에게 알림, 수동으로 구인글 재공개 가능
```

---

## 6. 프론트엔드 컨벤션

### 6.1 폴더 구조

```
src/
├── api/                  # 기능별 API 호출 함수 모음
├── app/                  # 앱 진입점, 라우터 설정
├── assets/               # 이미지, 폰트 등 정적 리소스
├── components/           # 공통 컴포넌트 (여러 feature에서 재사용)
├── contexts/             # React Context (전역 상태)
├── features/             # 기능별 모듈
│   ├── alarm/
│   ├── auth/             # auth 관련 컴포넌트 파일들
│   ├── calendar/
│   ├── chat/
│   ├── manager/
│   ├── mypage/
│   └── survey/
└── pages/                # 라우트 단위 페이지 컴포넌트
```

### 6.2 API 작성 규칙

- API 호출 함수는 반드시 `src/api/`에서 기능별로 파일을 분리해서 관리한다. `features/` 하위에 api 파일을 두지 않는다.
- 모든 API 함수 위에 메서드, 경로, 용도를 주석으로 명시한다.

```typescript
// 룸메이트 신청 (POST /api/matching/apply)
export const applyRoommate = (targetUserId: number) => {
  return axiosInstance.post('/matching/apply', { targetUserId });
};
```

- 공통 baseURL, 토큰 주입, 에러 처리는 `axiosInstance`에서 일괄 관리한다. 개별 API 함수에서 헤더를 직접 설정하지 않는다.

```typescript
// axiosInstance 예시 구조
const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_API_URL });
axiosInstance.interceptors.request.use(/* JWT 주입 */);
axiosInstance.interceptors.response.use(/* 에러 처리 */);
```

### 6.3 컴포넌트 관리 규칙

- **공통 컴포넌트** (버튼, 인풋, 모달 등 여러 feature에서 재사용): `src/components/`
- **기능 전용 컴포넌트** (특정 feature에서만 사용): `src/features/{기능}/` 바로 아래에 파일을 둔다. 하위에 `components/` 폴더를 만들지 않는다.
- 페이지 컴포넌트는 `src/pages/`에만 위치한다. 페이지 안에 직접 로직을 작성하지 않고 feature 컴포넌트를 조합하는 형태로 구성한다.

### 6.4 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수 / 함수 | camelCase | `getUserInfo`, `isLoggedIn` |
| 컴포넌트 파일 / React 컴포넌트 | PascalCase | `RoommateCard.tsx`, `ProfileModal` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |

### 6.5 정적 리소스

- 이미지, 아이콘 등 모든 정적 파일은 `src/assets/`에서 관리한다.
- 컴포넌트 내부에 이미지 경로를 하드코딩하지 않고 import해서 사용한다.

```typescript
import logoImg from '@/assets/logo.png';
```

### 6.6 권한 제어 — LLM 작성 금지 패턴

LLM이 코드를 생성할 때 아래 패턴은 절대 작성하지 않는다.

- `status: "PENDING"` 또는 `status: "REJECTED"` 사용자가 구인글 작성·신청·채팅 API를 호출하는 코드
- 합격증 이미지 경로나 승인 상태값(`status`)을 프론트엔드에서 직접 변경하는 코드
- 매칭 해지·탈퇴 시 상대방 구인글 비공개 전환 및 알림 발송을 생략하는 플로우
- `axiosInstance`를 우회하여 `axios.get/post`를 직접 호출하는 코드
- 회원가입 단계(이메일 인증 → 합격증 업로드 → 관리자 승인)를 건너뛰는 플로우
