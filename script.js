const MAX_COMMENT_LENGTH = 300;
const COMMENT_WARN_THRESHOLD = 250;
const USER_SUBMISSIONS_KEY = "havehad-community:user-submissions";

const colorByEmoji = {
  "✨": "#dea62d",
  "💡": "#2c5c40",
  "👕": "#dc4737",
  "💭": "#1f2d89",
  "💛": "#87a076",
};

const seedIdeas = [
  { id: 347, comment: "쇼츠팬츠는 와이드하면서도 길이는 적당히 짧아서 다리가 날씬해 보이면 좋을 것 같아요. 해브해드만의 패턴이 있으면 셋업과 셔츠 모두 유용하게 사용될 것 같습니다.", emoji: "👕" },
  { id: 1289, comment: "카키색 핀턱 팬츠가 기대됩니다. 통이 너무 넓지 않았으면 좋겠어요.", emoji: "✨" },
  { id: 1024, comment: "린넨 셋업도 생각해 주시면 좋겠습니다.", emoji: "💡" },
  { id: 1745, comment: "자켓 소재에 스판이 섞였으면 합니다. 그리고 덜 구겨지면 좋겠어요.", emoji: "💛" },
  { id: 891, comment: "셋업 색상이 여러 가지로 나오면 좋을 것 같아요.", emoji: "💭" },
  { id: 1392, comment: "다양한 곳에 코디할 수 있는 최대한 베이직한 옷이 만들어졌으면 좋겠습니다.", emoji: "👕" },
  { id: 612, comment: "쇼트팬츠(롤업, 논 롤업), 쇼트자켓(반팔)이 나왔으면 좋겠어요.", emoji: "💡" },
  { id: 1956, comment: "소재나 원단 부분에서도 선택할 수 있는 옵션이 있으면 좋겠어요. 소재에 따라 디테일이 달라지는 부분이 있더라구요.", emoji: "💛" },
  { id: 1487, comment: "어느 옷과도 매치가 잘 되도록 포켓은 최소화해서 심플하게요. 그리고 허리 사이즈 선택의 폭이 넓었으면 좋겠습니다.", emoji: "💭" },
  { id: 2148, comment: "팬츠에 밴드는 없었으면 합니다. 밴드만 없어도 잘 만들어진 옷이라는 느낌을 주거든요. 안 보이는 히든 밴드면 괜찮습니다.", emoji: "👕" },
  { id: 783, comment: "봄이 오니까 무채색 계열보다 색이 있는 옷이 나오면 좋겠어요. 채도가 높은 밝은색 — 옐로우, 핑크, 퍼플, 버건디, 하늘색 등.", emoji: "✨" },
  { id: 1678, comment: "일상에서 툭 걸쳐도 자연스러운 옷이면 좋겠어요. 깔끔한 옷에 해브해드의 포인트만 있어도 충분할 것 같다는 생각이 들었습니다.", emoji: "💭" },
  { id: 2031, comment: "편하지만 포인트가 될 수 있는 셋업, 부담스럽지 않았으면 좋겠어요.", emoji: "💛" },
  { id: 1156, comment: "자연스럽지만 가끔은 격식 있는 모임에도 입을 수 있는, 자주 손이 가는 옷을 만들어 주시면 좋겠습니다.", emoji: "👕" },
  { id: 1812, comment: "다리가 길어 보이는 핏 예쁜 바지를 만들어 주시면 합니다. 자켓의 경우 위쪽 주머니가 없는 옵션도 있었으면 좋겠어요.", emoji: "✨" },
  { id: 218, comment: "흰색 셔츠가 잘 비치지 않으면 좋겠어요. 안에 입는 옷 신경 쓰지 않고 출근하고 싶어요.", emoji: "💡" },
  { id: 1532, comment: "면 100% 옥스포드 원단 셔츠를 만들어 주세요. 오래 입을 수 있는 기본 한 벌이 필요합니다.", emoji: "👕" },
  { id: 2274, comment: "셔츠 카라 모양에 변주가 있으면 좋겠어요. 만다린 카라나 오픈 카라처럼요.", emoji: "✨" },
  { id: 974, comment: "가을 코트 라인을 미리 고민해 주시면 좋겠습니다. 매년 좋은 코트 한 벌이 늘 아쉬워요.", emoji: "💭" },
  { id: 1631, comment: "셋업 자켓의 라펠 너비를 조금 줄여 주시면 더 모던해 보일 것 같아요.", emoji: "💛" },
  { id: 432, comment: "팬츠 길이가 9부 정도 되는 옵션도 있었으면 합니다. 발목이 살짝 보이는 길이요.", emoji: "👕" },
  { id: 2389, comment: "안감이 없는 가벼운 자켓도 만들어 주세요. 봄·가을 활용도가 높을 것 같습니다.", emoji: "💡" },
  { id: 1873, comment: "베이지·아이보리 같은 따뜻한 무채색 셋업이 한 벌 있으면 좋겠어요.", emoji: "✨" },
  { id: 567, comment: "검정 셋업도 너무 광택 없이 차분한 톤으로 부탁드립니다.", emoji: "💭" },
  { id: 1247, comment: "자켓 내부 안주머니가 있으면 좋겠습니다. 카드지갑 정도 들어가는 사이즈로요.", emoji: "💛" },
  { id: 2056, comment: "팬츠 허리 라인이 살짝 높은 편이면 좋겠어요. 셔츠를 인했을 때 비율이 잘 잡혀서요.", emoji: "👕" },
  { id: 698, comment: "사이즈는 XS부터 XL까지 다양하게 부탁드립니다. 작은 사이즈가 정말 귀해요.", emoji: "💡" },
  { id: 1429, comment: "키 큰 사람을 위한 톨 사이즈 라인이 있으면 좋겠어요. 178cm인데 늘 기장이 짧아요.", emoji: "✨" },
  { id: 2167, comment: "셋업 단품 구매가 가능했으면 좋겠습니다. 자켓만 따로, 팬츠만 따로 살 수 있게요.", emoji: "💭" },
  { id: 1083, comment: "화면 색감이 실제 색과 거의 일치해서 항상 만족스러워요. 이대로 유지해 주세요.", emoji: "💛" },
  { id: 384, comment: "디테일 컷이 더 많았으면 좋겠어요. 단추 모양, 봉제선 마감까지 보고 싶습니다.", emoji: "👕" },
  { id: 1768, comment: "봄·여름에 시원하게 입을 수 있는 셔링 셔츠가 있으면 좋겠어요.", emoji: "💡" },
  { id: 2412, comment: "셔츠 단추가 자개 단추면 좋을 것 같아요. 작은 디테일이 큰 차이를 만들거든요.", emoji: "✨" },
  { id: 901, comment: "양말도 셋업과 함께 코디할 수 있는 단정한 라인이 있으면 좋겠습니다.", emoji: "💭" },
  { id: 1574, comment: "벨트도 작게 만들어 주세요. 가는 가죽 벨트면 셋업과 잘 어울릴 것 같아요.", emoji: "💛" },
  { id: 2298, comment: "캐주얼 라인도 가끔 나오면 좋겠어요. 데님 팬츠나 후디 같은 것도요.", emoji: "👕" },
  { id: 472, comment: "후드 집업이 베이직하게 한 벌 있으면 좋겠습니다. 회색이나 네이비로요.", emoji: "💡" },
  { id: 1198, comment: "어깨가 좁아 보이지 않는 셔츠 패턴이 좋아요. 지금 셔츠 핏이 제 어깨에 잘 맞습니다.", emoji: "✨" },
  { id: 1934, comment: "셔츠 가슴 주머니가 작고 단정한 사이즈로 들어가면 좋겠어요.", emoji: "💭" },
  { id: 2087, comment: "자켓 단추 색이 옷감과 동색이면 차분해 보이고 좋습니다.", emoji: "💛" },
  { id: 624, comment: "셔츠 옷자락이 잘 처지지 않는 무게감이면 좋겠어요. 인할 때 미끄러지지 않게요.", emoji: "👕" },
  { id: 1356, comment: "다림질이 덜 필요한 소재면 정말 좋겠어요. 매일 출근 전 다림질이 부담스러워요.", emoji: "💡" },
  { id: 2231, comment: "면 100% 셋업도 만들어 주세요. 화학섬유에 알러지가 있어서 면이 좋습니다.", emoji: "✨" },
  { id: 845, comment: "자켓 어깨 패드가 너무 들어가지 않으면 좋겠어요. 자연스러운 어깨선이 좋습니다.", emoji: "💭" },
  { id: 1672, comment: "신발 라인이 있으면 좋겠어요. 셋업과 어울리는 단정한 더비 슈즈요.", emoji: "💛" },
  { id: 2143, comment: "모카 갈색 셋업이 한 벌 있었으면 합니다. 검정이 답답할 때 입을 수 있게요.", emoji: "👕" },
  { id: 519, comment: "사계절 입을 수 있는 적정 두께로 만들어 주시면 좋겠어요. 너무 따뜻하지 않게요.", emoji: "💡" },
  { id: 1287, comment: "비 오는 날 입을 수 있는 발수 가공 자켓도 한 벌 있으면 좋겠습니다.", emoji: "✨" },
  { id: 2369, comment: "출장 갈 때 구김이 덜 가는 셋업이 있으면 정말 도움될 것 같아요.", emoji: "💭" },
  { id: 932, comment: "잠옷·라운지웨어 라인도 있었으면 좋겠습니다. 집에서도 단정하게 입고 싶어요.", emoji: "💛" },
  { id: 1469, comment: "셔츠 색상 중에 옅은 라벤더나 옅은 민트 같은 봄색이 있으면 좋겠어요.", emoji: "👕" },
  { id: 2018, comment: "가방도 만들어 주세요. 출근용 단정한 토트백이 정말 필요합니다.", emoji: "💡" },
  { id: 736, comment: "무지 티셔츠를 면 100%로 한 라인 부탁드립니다. 비치지 않는 두께면 좋겠어요.", emoji: "✨" },
  { id: 1583, comment: "베이직 카디건도 있으면 좋겠습니다. 셔츠 위에 가볍게 걸칠 수 있는 두께로요.", emoji: "💭" },
  { id: 2257, comment: "가격대가 지금처럼 합리적으로 유지되었으면 좋겠습니다. 좋은 옷을 부담 없이 사고 싶어요.", emoji: "💛" },
  { id: 1118, comment: "한정 컬렉션도 가끔 나오면 좋겠어요. 특별한 시즌에만 살 수 있는 옷이요.", emoji: "👕" },
  { id: 408, comment: "옷 안 라벨 위치가 목 뒤가 아니라 옆쪽이면 까칠하지 않아서 좋을 것 같아요.", emoji: "💡" },
  { id: 1729, comment: "셔츠 첫 단추 위치가 너무 높지 않으면 좋겠어요. 답답해 보이지 않게요.", emoji: "✨" },
  { id: 2456, comment: "자켓 뒤 슬릿이 양쪽으로 들어가 있으면 활동성이 좋을 것 같습니다.", emoji: "💭" },
  { id: 853, comment: "사이드 포켓이 너무 깊으면 손이 잘 들어가지 않아요. 적당한 깊이가 좋겠습니다.", emoji: "💛" },
  { id: 1426, comment: "셔츠 손목 단추 위치가 두 개면 핏 조절이 가능해서 좋아요.", emoji: "👕" },
  { id: 2074, comment: "신축성 있는 면 셔츠도 있으면 좋겠어요. 종일 앉아 있는 직장인에게 필요합니다.", emoji: "💡" },
  { id: 597, comment: "셋업 컬러로 진녹색이나 와인 같은 깊은 색도 한 번씩 보고 싶어요.", emoji: "✨" },
  { id: 1853, comment: "옷 디자인이 너무 트렌디하지 않아서 좋아요. 오래 입을 수 있는 게 가장 큰 장점입니다.", emoji: "💭" },
  { id: 2196, comment: "매월 한 벌씩 천천히 모아가는 재미가 있어요. 다음 달도 기대됩니다.", emoji: "💛" },
  { id: 758, comment: "매월 정해진 출시 날짜가 있으면 좋겠습니다. 기다리는 재미를 위해서요.", emoji: "👕" },
  { id: 1334, comment: "출시 전 미리보기 메일이 있으면 좋겠어요. 어떤 옷이 나올지 미리 보고 싶어요.", emoji: "💡" },
  { id: 2123, comment: "매월 출시할 옷의 영감이 된 거리 사진을 같이 공유해 주시면 재미있을 것 같습니다.", emoji: "✨" },
  { id: 689, comment: "룩북에 다양한 체형의 모델이 함께 있으면 좋겠어요. 핏 참고가 잘 될 것 같습니다.", emoji: "💭" },
  { id: 1547, comment: "출시 후 몇 달 뒤에 같은 옷의 다른 색을 다시 내주시면 좋겠습니다.", emoji: "💛" },
  { id: 2342, comment: "사이즈 교환이 한 번 더 가능했으면 좋겠어요. 첫 구매는 사이즈 가늠이 어려워서요.", emoji: "👕" },
  { id: 967, comment: "매장에서 직접 입어볼 수 있는 기회가 가끔 있으면 좋겠습니다. 팝업 같은 형태로요.", emoji: "💡" },
  { id: 1791, comment: "인기 라인은 재입고 부탁드려요. 다시 사고 싶은데 재입고가 어렵더라구요.", emoji: "✨" },
  { id: 2089, comment: "가벼운 트렌치코트가 봄에 있으면 좋겠어요. 발목까지 떨어지는 긴 기장으로요.", emoji: "💭" },
  { id: 1145, comment: "셔츠 안에 입는 이너 셔츠도 있으면 좋겠습니다. 흰색·살구색 정도로 비치지 않게요.", emoji: "💛" },
  { id: 488, comment: "정장에 어울리는 단정한 머플러도 있으면 좋겠어요. 겨울에 활용도가 높을 것 같습니다.", emoji: "👕" },
  { id: 1976, comment: "케어 라벨이 작아서 입었을 때 보이지 않으면 좋겠습니다.", emoji: "💡" },
  { id: 2417, comment: "옷 안쪽 봉제선이 깔끔하면 살결에도 부담이 적고 오래 입을 수 있어요.", emoji: "✨" },
  { id: 826, comment: "셔츠 밑단 마감을 둥글게 해 주시면 인하지 않고 입어도 단정해 보일 것 같습니다.", emoji: "💭" },
  { id: 1683, comment: "셋업 자켓 길이가 엉덩이를 살짝 덮는 정도면 키 작은 분들도 잘 입을 수 있어요.", emoji: "💛" },
];

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const state = {
  items: shuffle(seedIdeas),
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
  const color = colorByEmoji[card.emoji] ?? "#87a076";
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
