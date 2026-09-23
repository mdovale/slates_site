// Home page polish. The Stage, its appearance switch, and every section work
// without this file; it only warms images, adds shortcuts, and runs the
// app-icon tour.
(() => {
  const stage = document.querySelector(".stage");
  if (!stage) return;

  const byId = (id) => document.getElementById(id);
  const prefersLight = matchMedia("(prefers-color-scheme: light)");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const select = (id) => {
    const input = byId(id);
    if (input) input.checked = true;
  };

  // The Stage starts in the visitor's appearance (CSS does that). Check the
  // matching switch so assistive tech hears the same thing it shows.
  const current = () =>
    byId("look-light").checked || (!byId("look-dark").checked && prefersLight.matches) ? "light" : "dark";
  select(`look-${current()}`);

  // Warm the slate screens so hovering swaps without a wait: slate 1 now,
  // the rest when the browser is idle, the other appearance on first reach.
  const warmed = new Set();
  const warm = (look, only) => {
    const key = `${look}${only || ""}`;
    if (warmed.has(key)) return;
    warmed.add(key);
    const selector = only ? `.layer-${look} .scr-${only} img` : `.layer-${look} img`;
    stage.querySelectorAll(selector).forEach((img) => {
      img.loading = "eager";
      img.decode().catch(() => {});
    });
  };
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));

  const warmCurrent = () => {
    warm(current(), 1);
    idle(() => warm(current()));
  };
  if (document.readyState === "complete") warmCurrent();
  else addEventListener("load", warmCurrent, { once: true });

  const look = stage.querySelector(".look");
  ["pointerenter", "focusin"].forEach((type) =>
    look.addEventListener(type, () => warm(current() === "dark" ? "light" : "dark"), { once: true })
  );

  // Digits 1–8 focus that slate, Esc returns to the list (the app's ⌘N and
  // ⌘\). ⌘1–⌘8 stay with the browser, which uses them for tabs.
  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return;
    if (event.target.closest("textarea, select, [contenteditable], input:not([type=radio], [type=range])")) return;
    if (event.key === "Escape") select("s0");
    else if (/^[1-8]$/.test(event.key)) select(`s${event.key}`);
  });

  // With a pointer that hovers, clicking the pinned glyph again unpins it.
  // Touch keeps the tapped glyph; the ‹ button returns to the list there.
  if (matchMedia("(hover: hover)").matches) {
    stage.querySelector(".picks").addEventListener("click", (event) => {
      const label = event.target.closest(".pick");
      if (!label || label.htmlFor === "s0" || !byId(label.htmlFor).checked) return;
      event.preventDefault();
      select("s0");
    });
  }

  // Easter egg: the app icon tours slates 1–8 once, then returns to the list.
  const picture = stage.querySelector(".hero-head picture");
  if (!picture) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "hero-icon-button";
  button.setAttribute("aria-label", "Tour the eight slates on the laptop");
  picture.replaceWith(button);
  button.append(picture);

  let timer = null;
  button.addEventListener("click", () => {
    if (timer || reduceMotion.matches) return;
    warm(current());
    let step = 0;
    timer = setInterval(() => {
      step += 1;
      select(step <= 8 ? `s${step}` : "s0");
      if (step > 8) {
        clearInterval(timer);
        timer = null;
      }
    }, 450);
  });
})();
