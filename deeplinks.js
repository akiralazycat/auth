(() => {
  const flowToSlug = {
    signin: "signin",
    link: "link",
    recovery: "recovery",
    lastMethod: "last-method",
    delete: "delete"
  };
  const slugToFlow = Object.fromEntries(Object.entries(flowToSlug).map(([key, slug]) => [slug, key]));

  const tabs = [...document.querySelectorAll("[data-flow]")];
  const langButtons = [...document.querySelectorAll("[data-lang]")];
  const progress = document.getElementById("flow-progress");
  const controls = document.querySelector(".flow-controls");
  if (!tabs.length || !progress || !controls) return;

  const shareButton = document.createElement("button");
  shareButton.type = "button";
  shareButton.className = "flow-share";
  shareButton.textContent = "Copy flow link";
  shareButton.setAttribute("aria-label", "Copy a direct link to this flow step");

  const shareStatus = document.createElement("span");
  shareStatus.className = "flow-share-status";
  shareStatus.setAttribute("aria-live", "polite");

  controls.append(shareButton, shareStatus);

  function activeLanguage() {
    return document.documentElement.lang === "ja" ? "ja" : "en";
  }

  function activeFlow() {
    return tabs.find((tab) => tab.classList.contains("is-active"))?.dataset.flow || "signin";
  }

  function activeStep() {
    const dots = [...progress.querySelectorAll(".progress-dot")];
    const index = dots.findIndex((dot) => dot.classList.contains("is-current"));
    return index >= 0 ? index : 0;
  }

  function updateShareLabel() {
    const ja = activeLanguage() === "ja";
    shareButton.textContent = ja ? "このステップを共有" : "Copy flow link";
    shareButton.setAttribute("aria-label", ja ? "このフローステップへの直接リンクをコピー" : "Copy a direct link to this flow step");
  }

  function buildFlowUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("flow", flowToSlug[activeFlow()] || "signin");
    url.searchParams.set("step", String(activeStep() + 1));
    url.searchParams.set("lang", activeLanguage());
    url.hash = "flows";
    return url;
  }

  function syncUrl() {
    const url = buildFlowUrl();
    history.replaceState(null, "", url);
  }

  function afterUiChange({ sync = true } = {}) {
    queueMicrotask(() => {
      updateShareLabel();
      if (sync) syncUrl();
    });
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {}
    }
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.append(input);
    input.select();
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) {}
    input.remove();
    return copied;
  }

  function applyUrlState() {
    const url = new URL(window.location.href);
    const requestedLang = url.searchParams.get("lang");
    const requestedFlow = slugToFlow[url.searchParams.get("flow")] || url.searchParams.get("flow");
    const requestedStep = Number.parseInt(url.searchParams.get("step") || "1", 10);

    if (requestedLang === "en" || requestedLang === "ja") {
      langButtons.find((button) => button.dataset.lang === requestedLang)?.click();
    }

    if (requestedFlow && flowToSlug[requestedFlow]) {
      tabs.find((tab) => tab.dataset.flow === requestedFlow)?.click();
    }

    queueMicrotask(() => {
      const dots = [...progress.querySelectorAll(".progress-dot")];
      if (dots.length) {
        const index = Number.isFinite(requestedStep) ? Math.min(Math.max(requestedStep - 1, 0), dots.length - 1) : 0;
        dots[index]?.click();
      }
      updateShareLabel();
      if (url.searchParams.has("flow")) syncUrl();
    });
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => afterUiChange()));
  langButtons.forEach((button) => button.addEventListener("click", () => afterUiChange({ sync: new URL(window.location.href).searchParams.has("flow") })));
  document.getElementById("flow-prev")?.addEventListener("click", () => afterUiChange());
  document.getElementById("flow-next")?.addEventListener("click", () => afterUiChange());
  document.getElementById("flow-reset")?.addEventListener("click", () => afterUiChange());
  progress.addEventListener("click", (event) => {
    if (event.target.closest(".progress-dot")) afterUiChange();
  });

  shareButton.addEventListener("click", async () => {
    const url = buildFlowUrl();
    history.replaceState(null, "", url);
    const ok = await copyText(url.toString());
    const ja = activeLanguage() === "ja";
    shareStatus.textContent = ok ? (ja ? "リンクをコピーしました" : "Link copied") : (ja ? "URLをアドレスバーからコピーしてください" : "Copy the URL from the address bar");
    window.setTimeout(() => { shareStatus.textContent = ""; }, 2600);
  });

  applyUrlState();
})();
