# havehad-community / 월간 해브해드

해브해드가 매월 새로 만들 옷에 대해 사람들의 아이디어를 익명으로 받는 페이지.

## 스택

- 정적 HTML / CSS / JavaScript (빌드 도구 없음)
- Pretendard Variable (jsdelivr CDN)
- Vercel 정적 호스팅 (GitHub `main` 푸시 → 자동 배포)

## 로컬 실행

```bash
python3 -m http.server 4173
# http://localhost:4173
```

## 구조

```
index.html         # 마크업 (헤더 · 인트로/폼 · 카드 스트림 · 푸터)
styles.css         # 다크 테마 + Pretendard 위계
script.js          # 카드 렌더 + 익명 의견 폼 + localStorage 영속화
favicon.png        # 파비콘 (검정 박스 안 흰 h)
logo-havehad.png   # 헤더/푸터 워드마크
```

## 익명 아이디어 폼

- 본문 최대 **300자**
- 250자부터 카운터 노란색, 300자 도달 시 빨간색
- 제출 카드는 브라우저 `localStorage`에 저장되어 새로고침 후에도 보임 (백엔드 없음)
- seed 데이터로 실제 고객 의견 일부를 카드 형태로 미리 노출
