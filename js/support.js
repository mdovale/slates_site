// Support: a Copy address button beside the email, with the app's
// two-second "Copied" confirmation. Without it, the address is a plain link.
(() => {
  const mail = document.querySelector(".contact .mail");
  if (!mail || !navigator.clipboard) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-mail";
  button.textContent = "Copy address";
  const status = document.createElement("span");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");

  let timer = null;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(mail.textContent.trim());
      button.textContent = "Copied";
      status.textContent = "Address copied";
    } catch {
      button.textContent = "Copy did not work";
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      button.textContent = "Copy address";
      status.textContent = "";
    }, 2000);
  });

  mail.after(button, status);
})();
