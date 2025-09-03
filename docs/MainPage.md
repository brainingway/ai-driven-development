좋습니다 👍 이제 **디자인 가이드**와 **PRD**를 바탕으로 메인페이지(`홈 피드`)에 대한 **프론트엔드 기능명세서**와 **백엔드 기능명세서**를 작성하겠습니다.

---

# 📝 메인페이지 기능명세서 (홈 피드)

## 1. 프론트엔드 기능명세서

### 1.1 화면 레이아웃 및 디자인

* **파일 위치**: `app/page.tsx`
* **구성요소**:

  * **탭 네비게이션 (ShadCN Tabs 컴포넌트)**

    * 탭: `추천 | 팔로잉 | 트렌딩`
  * **피드 카드 리스트 (Infinite Scroll)**

    * 카드 컴포넌트(`FeedCard.tsx`): 썸네일 이미지, 작성자 아바타/닉네임, 좋아요·댓글·리믹스 버튼
    * 각 카드 hover 시 soft shadow, scale-up
  * **상단 레이아웃**: `components/layout/header.tsx` 재사용
  * **무한 스크롤 로딩**: ShadCN **Skeleton 컴포넌트** 활용
* **반응형 디자인**:

  * 데스크탑: 3열 카드 그리드
  * 태블릿: 2열
  * 모바일: 1열, 카드 폭 100%

### 1.2 사용자 흐름 및 상호작용

* 유저가 피드 탭을 전환 → API 호출로 해당 피드 데이터 로딩
* 카드 내 액션:

  * **좋아요 버튼 (ShadCN Button + Icon)** → 클릭 시 즉시 UI 반영(optimistic update), API 호출
  * **댓글 버튼** → 이미지 상세 페이지로 이동
  * **리믹스 버튼** → 생성 에디터(`app/generate/page.tsx`)로 이동, 해당 이미지 파라미터 프리셋 불러오기
* 무한 스크롤 시 마지막 카드 노출 → 다음 페이지 API 호출

### 1.3 API 연동

* **피드 데이터 호출**:

  * 경로: `GET /api/feed?type={recommended|following|trending}&page={n}`
  * 응답: 이미지 카드 리스트(JSON)
* **좋아요 토글**:

  * 경로: `POST /api/images/{id}/like`
  * 요청: `{ liked: true|false }`
* **댓글/리믹스**: 상세 페이지와 에디터 페이지로 라우팅

### 1.4 테스트 항목

* [ ] 탭 전환 시 올바른 데이터가 로딩되는가?
* [ ] 무한 스크롤이 정상적으로 동작하는가?
* [ ] 좋아요 클릭 시 즉시 UI 반영 및 API 동기화가 되는가?
* [ ] 이미지 클릭 시 상세 페이지로 이동하는가?
* [ ] 모바일/데스크탑 레이아웃이 정상 적용되는가?

---

## 2. 백엔드 기능명세서

### 2.1 API 정의

* **피드 불러오기**

  * **엔드포인트**: `app/api/feed/route.ts`
  * **메서드**: `GET`
  * **쿼리 파라미터**:

    * `type`: `"recommended" | "following" | "trending"`
    * `page`: number (기본 1)
    * `limit`: number (기본 20)
  * **응답**:

    ```json
    {
      "data": [
        {
          "id": "img_123",
          "thumbnailUrl": "https://cdn/...jpg",
          "author": {
            "id": "user_1",
            "name": "Alice",
            "avatar": "/avatars/alice.png"
          },
          "likes": 120,
          "comments": 5,
          "remixes": 3,
          "createdAt": "2025-09-01T10:00:00Z"
        }
      ],
      "nextPage": 2
    }
    ```
* **좋아요 토글**

  * **엔드포인트**: `app/api/images/[id]/like/route.ts`
  * **메서드**: `POST`
  * **요청**:

    ```json
    { "liked": true }
    ```
  * **응답**:

    ```json
    { "success": true, "likes": 121 }
    ```

### 2.2 데이터베이스 설계

* **Image** 테이블:

  * `id`, `url`, `authorId`, `createdAt`
* **Like** 테이블:

  * `id`, `imageId`, `userId`, `createdAt`
* **Feed 정렬 로직**:

  * **추천**: 협업 필터링 + 태그 기반 추천
  * **팔로잉**: `Follow` 테이블 기반으로 유저가 팔로우한 사람의 최신 이미지
  * **트렌딩**: 최근 24시간 좋아요/댓글/리믹스 수 기준 랭킹

### 2.3 테스트 항목

* [ ] 추천/팔로잉/트렌딩 피드 쿼리가 정상적으로 작동하는가?
* [ ] 페이지네이션이 올바르게 동작하는가?
* [ ] 좋아요 API 요청 시 DB가 정상 반영되는가?
* [ ] 동일 유저가 같은 이미지에 중복 좋아요를 할 수 없는가?
* [ ] 성능: P95 응답속도 200ms 이하

