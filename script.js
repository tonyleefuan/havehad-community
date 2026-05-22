const API_BASE = "/api/v3";
const PAGE_SIZE = 3;

const colorByEmoji = {
  "icn-emoji-loudly-crying-face": "#2B9BEB",
  "icn-emoji-face-with-steam-from-nose": "#00AAAA",
  "icn-emoji-pile-of-poo": "#3E566C",
  "icn-emoji-anxious-face-with-sweat": "#364D9D",
  "icn-emoji-skull-and-crossbones": "#565557",
};

const fallbackMoments = [
  { id: 2, comment: "넷플릭스 돈을 같이 모으고 싶어용", emoji: "icn-emoji-loudly-crying-face" },
  { id: 4, comment: "자동이체날짜를 알고 싶어요", emoji: "icn-emoji-face-with-steam-from-nose" },
  {
    id: 5,
    comment:
      "1.부동산 투자시 상환횟수가 표시되면 좋겠어요 언제쯤 상환예정인지 알수있도록요. 2.투자수익을 기간별로 조회할수있었으면좋겠어요.",
    emoji: "icn-emoji-loudly-crying-face",
  },
  {
    id: 6,
    comment: "가계부 수입에 비해 지출초과분을 미리 알려줘서 과소비방지를 해줬으면 좋겠습니다.",
    emoji: "icn-emoji-pile-of-poo",
  },
  {
    id: 7,
    comment: "가계부 추출 기능! 통신사별 멤버십 혜택이 가능한 장소, 정보, 접근성 향상에 관련. 금융과 결합.",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  {
    id: 8,
    comment: "각 카드별로 내가 혜택을 잘 받고 있는지 관리하고 확인이 가능하면 좋겠다. 실적을 채웠는지 등등",
    emoji: "icn-emoji-skull-and-crossbones",
  },
  {
    id: 9,
    comment: "각종 금융사별 카드 내역을 다 종합해서, 내가 어느 카테고리에서 썻는지 쉽게 볼수있었으면",
    emoji: "icn-emoji-loudly-crying-face",
  },
  {
    id: 10,
    comment: "각종 브랜드별 생일축하 쿠폰이나 기념일 혜택을 찾아주면 좋겠어요 하나도 못 누리고 있음",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  {
    id: 11,
    comment:
      "각종 포인트들 전부 제각각 흩어져있고, 대체 어떤 포인트를 어디서 봐야하는지 얼마나 쌓여있는지 알 길이 없다. 이럴거면 포인트라는 제도가 왜 있는지 궁금하다. 포인트들 전체 조회가 가...",
    emoji: "icn-emoji-pile-of-poo",
  },
  {
    id: 12,
    comment:
      "간편송금의 장점으로 인해서 주거래은행 어플보다 토스이용을 하는편이지만 타행들도 지금 소액간편송금 제도로인해서 토스만큼 편하고 이체수수료 면제를 받습니다. 10회 이용무료보다 좀 ...",
    emoji: "icn-emoji-skull-and-crossbones",
  },
  {
    id: 13,
    comment:
      "결제할때마다, 내가 가진 카드들 중에 어떤 카드로 결제하면 할인을 받을 수 있는지 미리 체크해서 알려주면 좋겠다. 매번 어떤 카드로 결제해야 유리한지 고민하고 따지는 것이 귀찮다.",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  {
    id: 14,
    comment: "경조사때 아직도 현금으로 주고받는게 이상하다. 이것도 좀더 스마트해질 수 있을 것 같은데",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  { id: 15, comment: "계좌 거래내역 조회할때 특정 키워드로 검색하는게 없어서 불편해요", emoji: "icn-emoji-pile-of-poo" },
  {
    id: 16,
    comment: "계좌 거래내역조회가 다 되지 않고 중간에 기간을 넘어서 그 기간 조회가 잘 안되는 점을 개선 해주셨으면 좋겠습니다",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  {
    id: 17,
    comment: "계좌 내역 정리해서 볼 수 있도록 내맘대로 삭제할 수 있음 좋겠어요",
    emoji: "icn-emoji-loudly-crying-face",
  },
  {
    id: 18,
    comment: "계좌 비밀번호 4회 이상 틀려서 거래정지됐는데 직접 찾아가서 풀어야 한다고 하니 불편하더라구요..",
    emoji: "icn-emoji-pile-of-poo",
  },
  { id: 19, comment: "계좌 연결 할때 마다 은행정보 입력하기, 어떤 은행은 되고 안되고", emoji: "icn-emoji-pile-of-poo" },
  { id: 20, comment: "계좌 증설, 카드 증설 이벤트", emoji: "icn-emoji-skull-and-crossbones" },
  {
    id: 21,
    comment:
      "계좌나 카드들은 한번 안쓰기 시작하면 계속 안쓰게 되고, 또 휴면계좌가 되서 신용등급이 내려갔던 적이 있는데 이것을 미리 알면 좋겠다.",
    emoji: "icn-emoji-skull-and-crossbones",
  },
  { id: 22, comment: "계좌내역 중 필요없는건 삭제했음 좋겠어요.", emoji: "icn-emoji-loudly-crying-face" },
  { id: 23, comment: "계좌별 자동이체(무 수수료) 자주쓰는 계좌번호 자동 등록", emoji: "icn-emoji-loudly-crying-face" },
  {
    id: 24,
    comment:
      "계좌연결 할 때, 일일히 하나하나 등록하는 게 귀찮고 불편했어요. 다른 어플은 전화번호 인증 하나로 모든 계좌가 한 번에 연결되더라고요",
    emoji: "icn-emoji-pile-of-poo",
  },
  { id: 25, comment: "계좌연결이 쉬웠으면", emoji: "icn-emoji-loudly-crying-face" },
  { id: 26, comment: "계좌이체 수수료 무료 횟수를 다 썼을 때...", emoji: "icn-emoji-face-with-steam-from-nose" },
  {
    id: 27,
    comment: "계좌이체 하는 절차가 너무 어렵고 카드분실이나 재발급 인증서발급 너무 불편했습니다",
    emoji: "icn-emoji-face-with-steam-from-nose",
  },
  { id: 28, comment: "계죄등록없이한번등록되었으면합니다", emoji: "icn-emoji-skull-and-crossbones" },
  {
    id: 29,
    comment: "공공요금 납부기한 전날 미리 공지해주는 서비스가 있으면 좋겠습니다",
    emoji: "icn-emoji-loudly-crying-face",
  },
  { id: 30, comment: "공과금 및 세금 납부 밀리지 않도록 미리 알려주셨으면 합니다", emoji: "icn-emoji-pile-of-poo" },
];

const MAX_COMMENT_LENGTH = 300;
const COMMENT_WARN_THRESHOLD = 250;
const USER_SUBMISSIONS_KEY = "every-moment-copy:user-submissions";

const state = {
  items: [],
  userSubmissions: loadUserSubmissions(),
  pageQueue: [],
  isLoading: false,
  didUseFallback: false,
  cardObserver: null,
};

function loadUserSubmissions() {
  try {
    const raw = localStorage.getItem(USER_SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Could not read saved submissions", error);
    return [];
  }
}

function persistUserSubmissions() {
  try {
    localStorage.setItem(USER_SUBMISSIONS_KEY, JSON.stringify(state.userSubmissions));
  } catch (error) {
    console.warn("Could not persist submissions", error);
  }
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[nextIndex]] = [result[nextIndex], result[index]];
  }
  return result;
}

function getColumnCount() {
  if (window.matchMedia("(max-width: 639px)").matches) {
    return 1;
  }

  if (window.matchMedia("(min-width: 1280px)").matches) {
    return 3;
  }

  return 2;
}

async function requestJson(path) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const payload = await response.json();
  if (payload.resultType !== "SUCCESS") {
    throw new Error("Unexpected Toss API response");
  }

  return payload.success;
}

async function preparePages() {
  const firstPage = await requestJson("/journey/user-experience/list?page=1");
  const pages = Array.from({ length: firstPage.totalPages }, (_, index) => index + 1);
  state.pageQueue = shuffle(pages);
}

async function fetchNextBatch() {
  if (state.pageQueue.length === 0) {
    return [];
  }

  const pages = state.pageQueue.splice(0, PAGE_SIZE);
  const responses = await Promise.all(pages.map((page) => requestJson(`/journey/user-experience/list?page=${page}`)));
  return shuffle(responses.flatMap((response) => response.content));
}

function createCard(card) {
  const item = document.createElement("article");
  const color = colorByEmoji[card.emoji] ?? colorByEmoji["icn-emoji-skull-and-crossbones"];
  const isUserCard = typeof card.id === "string" && card.id.startsWith("me-");

  item.className = "moment-card";
  item.dataset.emoji = card.emoji;
  item.style.setProperty("--card-color", color);
  if (isUserCard) {
    item.dataset.source = "user";
  }

  const meta = document.createElement("div");
  meta.className = "moment-meta";

  const icon = document.createElement("img");
  icon.src = `https://static.toss.im/icons/svg/${card.emoji}.svg`;
  icon.alt = "";

  const label = document.createElement("span");
  label.textContent = isUserCard
    ? "방금 남긴 불편함"
    : `${Number(card.id).toLocaleString("ko-KR")}번째 불편함`;

  const copy = document.createElement("p");
  copy.textContent = card.comment;

  meta.append(icon, label);
  item.append(meta, copy);
  return item;
}

function observeCards(root) {
  state.cardObserver?.disconnect();
  state.cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          state.cardObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 260px 0px", threshold: 0.01 }
  );

  root.querySelectorAll(".moment-card:not(.is-visible)").forEach((card) => state.cardObserver.observe(card));
}

function renderCards() {
  const stream = document.querySelector("#momentStream");
  if (!stream) return;

  const columnCount = getColumnCount();
  const columns = Array.from({ length: columnCount }, () => []);
  const merged = [...state.userSubmissions, ...state.items];

  merged.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  stream.style.setProperty("--columns", String(columnCount));
  stream.replaceChildren();

  columns.forEach((columnItems) => {
    const column = document.createElement("div");
    column.className = "stream-column";
    columnItems.forEach((card) => column.appendChild(createCard(card)));
    stream.appendChild(column);
  });

  observeCards(stream);
}

async function loadMore() {
  if (state.isLoading) {
    return;
  }

  state.isLoading = true;

  try {
    if (state.pageQueue.length === 0 && state.items.length === 0) {
      await preparePages();
    }

    const nextItems = await fetchNextBatch();
    state.items = [...state.items, ...nextItems];

    if (state.items.length === 0 && !state.didUseFallback) {
      state.didUseFallback = true;
      state.items = fallbackMoments;
    }
  } catch (error) {
    if (state.items.length === 0 && !state.didUseFallback) {
      state.didUseFallback = true;
      state.items = fallbackMoments;
    } else {
      console.warn(error);
    }
  } finally {
    renderCards();
    state.isLoading = false;
  }
}

function bindInfiniteScroll() {
  const loader = document.querySelector("#streamLoader");
  if (!loader) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (state.didUseFallback || (state.pageQueue.length === 0 && state.items.length > 0)) {
          observer.disconnect();
          loader.style.display = "none";
          return;
        }
        loadMore();
      }
    },
    { rootMargin: "0px 0px 2200px 0px" }
  );

  observer.observe(loader);
}

function bindResponsiveColumns() {
  let currentColumnCount = getColumnCount();
  window.addEventListener("resize", () => {
    const nextColumnCount = getColumnCount();
    if (nextColumnCount !== currentColumnCount) {
      currentColumnCount = nextColumnCount;
      renderCards();
    }
  });
}

function bindForm() {
  const form = document.querySelector("#momentForm");
  const textarea = document.querySelector("#momentInput");
  const counter = document.querySelector("#charCount");
  const submitButton = document.querySelector("#submitButton");
  if (!form || !textarea || !counter || !submitButton) return;

  const counterWrap = counter.closest(".char-counter");
  const emojiPool = Object.keys(colorByEmoji);

  function updateCounter() {
    const length = textarea.value.length;
    counter.textContent = String(length);
    if (counterWrap) {
      counterWrap.classList.toggle("is-limit", length >= MAX_COMMENT_LENGTH);
      counterWrap.classList.toggle(
        "is-near",
        length >= COMMENT_WARN_THRESHOLD && length < MAX_COMMENT_LENGTH
      );
    }
    submitButton.disabled = textarea.value.trim().length === 0;
  }

  textarea.addEventListener("input", updateCounter);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const comment = textarea.value.trim();
    if (!comment) return;

    const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
    const submission = {
      id: `me-${Date.now()}`,
      comment: comment.slice(0, MAX_COMMENT_LENGTH),
      emoji,
      createdAt: Date.now(),
    };

    state.userSubmissions = [submission, ...state.userSubmissions];
    persistUserSubmissions();
    renderCards();

    textarea.value = "";
    updateCounter();
    textarea.focus();
  });

  updateCounter();
}

bindForm();
bindResponsiveColumns();
bindInfiniteScroll();
loadMore();
