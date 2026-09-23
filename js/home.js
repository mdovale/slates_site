// Easter egg: clicking the app icon walks the hero through the eight slates
// once, then settles back on slate 1. The page never needs this to render.
(() => {
  const hero = document.querySelector(".hero");
  const picture = hero && hero.querySelector("picture");
  const dots = hero ? [...hero.querySelectorAll(".strip .dot")] : [];
  if (!picture || dots.length !== 8) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "hero-icon-button";
  button.setAttribute("aria-label", "Cycle through the eight slate colors");
  picture.replaceWith(button);
  button.append(picture);

  const show = (index) => {
    dots.forEach((dot, n) => dot.classList.toggle("is-active", n === index));
    hero.style.setProperty("--hero-accent", `var(--slate-${index + 1})`);
  };

  let timer = null;
  button.addEventListener("click", () => {
    if (timer) return;
    let step = 0;
    timer = setInterval(() => {
      step += 1;
      show(step % 8);
      if (step === 8) {
        clearInterval(timer);
        timer = null;
      }
    }, 280);
  });
})();
