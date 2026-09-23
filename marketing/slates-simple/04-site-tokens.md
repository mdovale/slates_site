/* Personal site. Quiet on purpose.
   Body on paper, links in lagoon.
   Do not "correct" paper to #ffffff. */

:root {
  --ink:    #1c1415;
  --paper:  #f6f1ea;
  --muted:  #6b645c;
  --rule:   #d9d0c4;
  --link:   #2d7a99;
}

body {
  color: var(--ink);
  background: var(--paper);
  font-family: Georgia, serif;
}

a { color: var(--link); }
hr { border-color: var(--rule); }

h1 { letter-spacing: 0.02em; }
.caption { color: var(--muted); }

@media (prefers-color-scheme: dark) {
  :root { --paper: #1c1415; --ink: #f6f1ea; }
}
