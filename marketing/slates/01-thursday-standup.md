# Thursday standup · palette picker

Attendees: **Sam** (EM), **Priya**, **Jules**, me. Join is still `meet.example/slate-thu`.

Ship the **palette picker** this afternoon if the caret still lands where it should after a swatch click. That is the whole gate. Priya reproduced the jump on a vertical list with wrap off; I cannot get it on the horizontal strip. Treat that as a **list-axis bug**, not a color bug.

Sam wants a sentence in the launch notes that a normal person could read. Draft, not poetry:

The picker writes the token you clicked and **leaves the caret where you were typing**. No new document. No “are you sure.”

Open questions, in the order they will derail us:

- Does `caretOffset` survive the SwiftUI identity change when the card reloads, or are we restoring a stale `NSRange`? Priya thinks restore; I think we never persist it.
- If the user clicks a swatch with a **multi-cursor**, do we paint all of them or only the first? Jules said “all of them, obviously.” I said “let me look.” That is not an answer.
- Quiet hour after lunch is real this week — campus testing the fire alarm in Building 18 between _1:10 and 1:25_. Do not schedule a huddle in that window and then look confused.

Leave the window open. Do not start a new document. The review deck is already lying in the other pad; this one is for the things that will fall out of Slack by 4 p.m.

**Decided**

- Default swatch order follows the palette, not last-used. Last-used is a setting, off for GA.
- Hex literals stay visible in the editor. The chip is a preview, not a replacement.
- We will not block on the multi-cursor case. Document it as “first caret” and file a follow-up. Jules made a face and then agreed.

**Still mine**

Walk the _focus → list → focus_ path once on a slate that already has a custom height. If the picker recenters the window I will hear about it in the all-hands Slack, which is a social failure mode and not a stack trace.

If we slip past 4, Sam will move the external note to Friday and I will owe Priya coffee. The good espresso, not the café on 3.
