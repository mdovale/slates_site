// /features polish. Chapters, captures, mode tabs, the language picker, and
// the layout toggle work without this file. It adds the rail's "you are
// here", the palette wall, the mini slate's buttons, and clickable bullets.
// Nothing is stored; a reload forgets everything.
(() => {
  document.documentElement.classList.add("has-js");
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Demos follow the visitor's appearance until they pick; say so to AT.
  if (!$$("[name=mode-look]:checked").length) {
    const light = matchMedia("(prefers-color-scheme: light)").matches;
    document.getElementById(light ? "mode-light" : "mode-dark").checked = true;
  }

  // Rail: mark the chapter crossing the middle of the viewport.
  const links = new Map($$(".rail a").map((a) => [a.hash.slice(1), a]));
  if ("IntersectionObserver" in window) {
    const crossing = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => (isIntersecting ? crossing.add(target.id) : crossing.delete(target.id)));
      links.forEach((a, id) => (crossing.has(id) ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
    }, { rootMargin: "-50% 0px -49% 0px" });
    $$(".chapter").forEach((chapter) => observer.observe(chapter));
  }

  // Palette wall: wear a built-in palette. Hex values come from the app's
  // palette definitions (bg, header, accent, chrome, digit, light/dark ink).
  const themed = $$("main [class*='slot-']");
  const wear = (data) => {
    const slots = data && data.split(";").map((slot) => slot.split(","));
    themed.forEach((el) => {
      const n = Number((el.className.match(/slot-(\d)/) || [])[1]);
      if (!slots || !n) return;
      const [wash, header, accent, chrome, digit, ink] = slots[n - 1];
      const set = { "--wash": wash, "--header": header, "--accent": accent, "--chrome": chrome, "--digit": digit };
      Object.entries(set).forEach(([prop, hex]) => el.style.setProperty(prop, `#${hex}`));
      el.style.setProperty("--band-ink", ink === "d" ? "#141414" : "#ffffff");
      el.style.setProperty("--band-soft", ink === "d" ? "#2b2b2b" : "#e7e7e7");
    });
    if (!slots) themed.forEach((el) => el.removeAttribute("style"));
  };
  const swatches = $$(".palette-row li").map((li, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-pressed", String(index === 0));
    button.append(...li.childNodes);
    li.append(button);
    button.addEventListener("click", () => {
      swatches.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      wear(index === 0 ? null : li.dataset.palette);
    });
    return button;
  });

  // Mini slate: live counts, Copy, and Copy & Clear with the app's
  // two-second confirmation. Only the Clipboard API; nothing is kept.
  const mini = document.querySelector("[data-mini]");
  if (mini) {
    const text = mini.querySelector("textarea");
    const count = mini.querySelector("[data-count]");
    const status = mini.querySelector(".mini-status");
    const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
    const recount = () => {
      const value = text.value;
      const lines = value ? value.split("\n").length : 0;
      const words = (value.match(/\S+/g) || []).length;
      count.textContent = `Slate 2 · ${plural(lines, "line")} · ${plural(words, "word")} · ${plural(value.length, "character")}`;
    };
    let timer = null;
    const copy = async (clear) => {
      try {
        await navigator.clipboard.writeText(text.value);
        if (clear) text.value = "";
        status.textContent = clear ? "Copied and cleared" : "Copied";
      } catch {
        status.textContent = "Copy is not available here";
      }
      recount();
      clearTimeout(timer);
      timer = setTimeout(() => (status.textContent = ""), 2000);
    };
    if (navigator.clipboard) {
      mini.querySelector(".mini-actions").hidden = false;
      mini.querySelector("[data-copy]").addEventListener("click", () => copy(false));
      mini.querySelector("[data-copy-clear]").addEventListener("click", () => copy(true));
    }
    text.addEventListener("input", recount);
    recount();
  }

  // Smart bullets: the app's Traffic Light and Kanban cycles, with the
  // header dash drawn the way the app draws it (▓░ plus done/total).
  const cycles = {
    traffic: [["⚪", "Idle"], ["🟡", "In Progress"], ["🟢", "Ready"], ["✅", "Done"]],
    kanban: [["◯", "Backlog"], ["◐", "Doing"], ["●", "Done"]],
  };
  const bar = (done, total, max = 5) => {
    const segments = Math.min(total, max);
    let filled = done;
    if (total > max) filled = done === 0 ? 0 : done === total ? max : 1 + Math.floor(((done - 1) * (max - 1)) / (total - 1));
    return "▓".repeat(filled) + "░".repeat(segments - filled);
  };
  $$("[data-cycle]").forEach((slate) => {
    const states = cycles[slate.dataset.cycle];
    const dash = slate.querySelector("[data-dash]");
    dash.setAttribute("role", "img");
    const bullets = $$(".bullet", slate).map((span) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bullet";
      button.dataset.state = String(states.findIndex(([glyph]) => glyph === span.textContent));
      span.replaceWith(button);
      return button;
    });
    const draw = () => {
      let done = 0;
      bullets.forEach((button) => {
        const index = Number(button.dataset.state);
        const [glyph, name] = states[index];
        const next = states[(index + 1) % states.length][1];
        const last = index === states.length - 1;
        button.textContent = glyph;
        button.setAttribute("aria-label", `${name}. Click for ${next}.`);
        button.parentElement.classList.toggle("is-done", last);
        if (last) done += 1;
      });
      dash.textContent = `${bar(done, bullets.length)} ${done}/${bullets.length}`;
      dash.setAttribute("aria-label", `${done} of ${bullets.length} done`);
    };
    bullets.forEach((button) =>
      button.addEventListener("click", () => {
        button.dataset.state = String((Number(button.dataset.state) + 1) % states.length);
        draw();
      })
    );
    draw();
  });
})();
