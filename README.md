# havehad-community

다크 톤 토스 every-moment 풍 익명 의견 수집 페이지.

## 스택

- 정적 HTML / CSS / JavaScript (빌드 도구 없음)
- Pretendard Variable (jsdelivr CDN)
- Vercel 배포 + `vercel.json` 리라이트로 외부 API 프록시

## 로컬 실행

```bash
python3 -m http.server 4173
# http://localhost:4173 에서 확인
```

## 배포

GitHub `main` 브랜치에 푸시하면 Vercel이 자동으로 프로덕션에 반영합니다.

## 구조

```
index.html         # 마크업
styles.css         # 다크 테마 + Pretendard 위계
script.js          # 카드 스트림 + 익명 의견 폼 + localStorage 영속화
logo-havehad.png   # 헤더 로고 (흰색 워드마크)
vercel.json        # /api/v3/* 프록시 설정
```

## 익명 의견 폼

- 본문 최대 **300자**
- 250자부터 카운터 색이 노란색, 300자 도달 시 빨간색
- 제출 카드는 브라우저 `localStorage`에 저장되어 새로고침 후에도 보임 (백엔드는 없음)
