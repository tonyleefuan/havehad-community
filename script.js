const MAX_COMMENT_LENGTH = 300;
const COMMENT_WARN_THRESHOLD = 250;
const USER_SUBMISSIONS_KEY = "havehad-community:user-submissions";

const colorByEmoji = {
  "✨": "#2B9BEB",
  "💡": "#00AAAA",
  "👕": "#3E566C",
  "💭": "#364D9D",
  "💛": "#565557",
};

const seedIdeas = [
  { id: 1, comment: "쇼츠팬츠는 와이드하면서도 길이는 적당히 짧아서 다리가 날씬해 보이면 좋을 것 같아요. 해브해드만의 패턴이 있으면 셋업과 셔츠 모두 유용하게 사용될 것 같습니다.", emoji: "👕" },
  { id: 2, comment: "카키색 핀턱 팬츠가 기대됩니다. 통이 너무 넓지 않았으면 좋겠어요.", emoji: "✨" },
  { id: 3, comment: "린넨 셋업도 생각해 주시면 좋겠습니다.", emoji: "💡" },
  { id: 4, comment: "자켓 소재에 스판이 섞였으면 합니다. 그리고 덜 구겨지면 좋겠어요.", emoji: "💛" },
  { id: 5, comment: "셋업 색상이 여러 가지로 나오면 좋을 것 같아요.", emoji: "💭" },
  { id: 6, comment: "다양한 곳에 코디할 수 있는 최대한 베이직한 옷이 만들어졌으면 좋겠습니다.", emoji: "👕" },
  { id: 7, comment: "쇼트팬츠(롤업, 논 롤업), 쇼트자켓(반팔)이 나왔으면 좋겠어요.", emoji: "💡" },
  { id: 8, comment: "소재나 원단 부분에서도 선택할 수 있는 옵션이 있으면 좋겠어요. 소재에 따라 디테일이 달라지는 부분이 있더라구요.", emoji: "💛" },
  { id: 9, comment: "어느 옷과도 매치가 잘 되도록 포켓은 최소화해서 심플하게요. 그리고 허리 사이즈 선택의 폭이 넓었으면 좋겠습니다.", emoji: "💭" },
  { id: 10, comment: "팬츠에 밴드는 없었으면 합니다. 밴드만 없어도 잘 만들어진 옷이라는 느낌을 주거든요. 안 보이는 히든 밴드면 괜찮습니다.", emoji: "👕" },
  { id: 11, comment: "봄이 오니까 무채색 계열보다 색이 있는 옷이 나오면 좋겠어요. 채도가 높은 밝은색 — 옐로우, 핑크, 퍼플, 버건디, 하늘색 등.", emoji: "✨" },
  { id: 12, comment: "일상에서 툭 걸쳐도 자연스러운 옷이면 좋겠어요. 깔끔한 옷에 해브해드의 포인트만 있어도 충분할 것 같다는 생각이 들었습니다.", emoji: "💭" },
  { id: 13, comment: "편하지만 포인트가 될 수 있는 셋업, 부담스럽지 않았으면 좋겠어요.", emoji: "💛" },
  { id: 14, comment: "자연스럽지만 가끔은 격식 있는 모임에도 입을 수 있는, 자주 손이 가는 옷을 만들어 주시면 좋겠습니다.", emoji: "👕" },
  { id: 15, comment: "다리가 길어 보이는 핏 예쁜 바지를 만들어 주시면 합니다. 자켓의 경우 위쪽 주머니가 없는 옵션도 있었으면 좋겠어요.", emoji: "✨" },
];

const state = {
  items: [...seedIdeas],
  userSubmissions: loadUserSubmissions(),
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

function getColumnCount() {
  if (window.matchMedia("(max-width: 639px)").matches) {
    return 1;
  }
  if (window.matchMedia("(min-width: 1280px)").matches) {
    return 3;
  }
  return 2;
}

function createCard(card) {
  const item = document.createElement("article");
  const color = colorByEmoji[card.emoji] ?? "#565557";
  const isUserCard = typeof card.id === "string" && card.id.startsWith("me-");

  item.className = "moment-card";
  item.style.setProperty("--card-color", color);
  if (isUserCard) {
    item.dataset.source = "user";
  }

  const meta = document.createElement("div");
  meta.className = "moment-meta";

  const icon = document.createElement("span");
  icon.className = "moment-emoji";
  icon.textContent = card.emoji;
  icon.setAttribute("aria-hidden", "true");

  const label = document.createElement("span");
  label.textContent = isUserCard
    ? "방금 보낸 아이디어"
    : `${Number(card.id).toLocaleString("ko-KR")}번째 아이디어`;

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
renderCards();
