(() => {
  function load(src, onload) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = onload;
    script.onerror = () => console.error(`Failed to load ${src}`);
    document.head.append(script);
  }
  load("./script-base.js", () => load("./deeplinks.js"));
})();
