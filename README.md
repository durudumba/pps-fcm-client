# 조달청 입찰공고 알림 서비스 - 클라이언트

**React / TypeScript** 기반의 조달청(나라장터) 입찰공고 실시간 알림 서비스의 웹 클라이언트입니다.

사용자가 관심 키워드를 등록하면, 해당 키워드가 포함된 신규 입찰공고가 등록될 때 **FCM(Firebase Cloud Messaging) 브라우저 푸시 알림**을 수신할 수 있습니다.

> 관련 프로젝트
> - [FCM 알림 발송 서버 (pps-fcm-server)](https://github.com/durudumba/pps-fcm-server)
> - [입찰공고 수집 서버 (pps-noti-collect-server)](https://github.com/durudumba/pps-noti-collect-server)

## 개발 기간

2025.07 ~ 2025.08

## 기술 스택

| 분류 | 기술 |
|---|---|
| Language | TypeScript 4.9 |
| Framework | React 19 |
| 푸시 알림 | Firebase Cloud Messaging (FCM) |
| HTTP | Axios |
| Styling | styled-components 6 |
| 라우팅 | React Router DOM v6 |

## 주요 기능

### FCM 알림 등록 / 해제
- 브라우저에서 FCM 토큰을 발급받아 서버에 등록
- 사용자 이름과 관심 키워드(쉼표 구분, 복수 설정 가능)를 함께 등록
- 알림 해제 시 서버에서 FCM 토큰 삭제

### 실시간 브라우저 푸시 알림
- 키워드 매칭 입찰공고 발생 시 브라우저 푸시 알림 수신
- 알림 수신을 위해 HTTPS 환경 필요

### 알림 수신 이력 조회
- 수신한 푸시 알림 내역 목록 조회

## 시스템 구성

```
[pps-noti-collect-server]          [pps-fcm-server]         [pps-fcm-client]
 조달청 Open API 호출  ──DB 저장──▶  키워드 매칭 후       ──FCM 푸시──▶  브라우저 알림
 5분마다 입찰공고 수집               FCM 알림 발송
```

## 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트
├── pages/          # 라우팅 페이지
└── firebase.ts     # Firebase 초기화 및 FCM 설정
```

## 실행 방법

```bash
npm install
npm start
```

