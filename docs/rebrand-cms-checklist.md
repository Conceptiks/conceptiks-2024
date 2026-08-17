# Rebrand handover — what's left

The repository and the Builder.io copy are both rebranded to **Maxim Tan** and
rewritten in the first person. What remains is legal text, and shutting down
services the site no longer talks to.

A full export of the CMS as it was **before** any edits is in
`docs/cms-backup/` (`page.json`, `portfolio-item.json`) — that's the restore
point if any copy change needs reverting.

---

## 1. Blocking: the Datenschutzerklärung is now wrong in both directions

All analytics were removed from the site. The privacy policy at `/datenschutz`
was not touched — it's a legal document, and rewriting it is your call. As it
stands it is inaccurate:

**It declares things that no longer exist.** Section 5 ("Analyse-Tools und
Werbung") in full, plus the cookie/consent sections:

| Still declared        | Mentions | Reality                  |
| --------------------- | -------- | ------------------------ |
| Google Tag Manager    | 6        | removed                  |
| Google Analytics      | 10       | removed                  |
| Google Ads / AdSense / Remarketing / Conversion | 14 | removed |
| Hotjar                | 17       | removed                  |
| CCM19 consent manager | 7        | removed                  |
| Cookies               | 44       | the site now sets none   |

It also still describes **Hubspot CRM**, **WhatsApp**, **Google Meet** and a
**Newsletter**, none of which the site uses.

**It fails to declare something that does exist.** The contact form now sends
through **SendGrid** (Twilio, US-based). That's a processor handling personal
data and it needs its own section. Cloudflare Turnstile *is* already covered.

The honest short version of the new policy is: server logs, the contact form,
SendGrid as mail processor, Cloudflare Turnstile, Hetzner/Cloudflare hosting.
Everything else can go. Get it checked by whoever supplied the original text.

## 2. Blocking: verify the Impressum

I changed the parts that were factually tied to the old brand:

- Removed the `Conceptiks` line under your name
- `privacy@conceptiks.com` → `hallo@maximtan.de`
- `Am Heidenhuebel` → `Am Heidenhübel`
- "**Unsere** E-Mail-Adresse" → "Meine", "**Wir** sind nicht bereit" → "Ich bin nicht bereit"

Still needs **your** eyes, because I can't verify them:

- Telefon `068432079829`
- Umsatzsteuer-ID `DE310652304`
- The Hiscox professional indemnity entry

## 3. Mailbox and domain

The site now sends to and advertises **hallo@maximtan.de**, and the sitemap
emits `https://maximtan.de`.

Before cutover, confirm the mailbox exists and that **SendGrid is authenticated
for `maximtan.de`**. An unauthenticated sender domain doesn't bounce — it
quietly lands every contact-form notification in spam.

---

## 4. Services you can now switch off

Nothing in the codebase talks to these any more.

| Service                        | Note                                                                     |
| ------------------------------ | ------------------------------------------------------------------------ |
| Server-side GTM container      | `ctm.conceptiks.com` + `ctm-preview…`; `nginx.conf` deleted from the repo. The Hetzner box and its Let's Encrypt certs can go too. |
| Google Analytics `G-8PF350N8FC`| No longer receiving events.                                              |
| Google Ads conversion `AW-11361528556` | The form no longer fires the conversion event.                    |
| Hotjar site `5011941`          | Script removed.                                                          |
| CCM19 consent manager          | Paid subscription — nothing left to gate.                                |
| Firebase project `conceptiks2024` | Was storing form submissions in a `leads` collection. **Export the existing leads before deleting the project.** |
| Pipedrive API token            | `PRIVATE_PIPEDRIVE_API_KEY` is no longer read; the site no longer creates leads, organisations or persons. Your CRM data is untouched — only the automatic intake stopped. |
| SendGrid template `d-9c36d4c899a04213b22c744ad039606b` | The form now sends a plain formatted mail instead. |

`.env` now only needs:

```
PUBLIC_BUILDER_API_KEY
PUBLIC_TURNSTILE_SITE_KEY
PRIVATE_TURNSTILE_SECRET
PRIVATE_SENDGRID_API_KEY
```

---

## 5. Copy that was deliberately left in the plural

Not everything with "wir" was agency-speak.

**Client testimonials on `/ueber`** — Philip Haas and Benjamin Billmann are
speaking about you in their own words ("**Wir** arbeiten sehr gerne mit Maxim
zusammen"). Changing those would misquote them.

**Two lines in the `/leistungen` process steps** — "Hier lernen **wir uns**
kennen" and "Hier besprechen **wir** die nächsten Schritte" describe you and the
client together. First person singular would be wrong German here.

**Portfolio case studies** — `metalstack-cloud-brand`, `metalstack-cloud`,
`kopf-korper-schule`, `hotel-restaurant-kreuz`, `sportakademie-baumann` narrate
in "wir" meaning *you and the client*. Left as they are; say the word if you want
them switched.

---

## 6. Dark mode: five blocks from finished

Dark mode ships as a toggle in the navigation and defaults to light. Five
Builder blocks have light backgrounds baked into the content and stay light when
the rest of the page goes dark:

| Page          | Baked background                                |
| ------------- | ----------------------------------------------- |
| `/leistungen` | `rgba(238,238,238,1)`, `#f5f5f5`                |
| `/ueber`      | `rgba(215,215,215,1)` ×2, `rgba(249,249,249,1)` |

Clear the background colour on those blocks in the editor. Then dark mode can
follow the system preference — extend the bootstrap script in `src/app.html` to
also honour `prefers-color-scheme: dark`.

---

## 7. Cosmetic leftovers

- Builder entry **names** (the internal labels in the content list) still read
  "Conceptiks - …". They're not user-facing and can't be set through the API —
  rename them in the editor if they bother you.
- The Builder **space** is still called `conceptiks-website`. Safe to rename in
  space settings; the API key is unaffected.
- Builder's stored **preview URLs** still point at `conceptiks.com` and
  `main--conceptiks2024.netlify.app`. They refresh once you preview from the new
  domain.

## 8. Known, not fixed

1. **Unknown URLs return HTTP 200, not 404.** `/gibtsnicht` renders "Content Not
   Found" with a 200 status, so search engines index it as a real page. The fix
   is throwing a 404 from `[...slug]/+page.server.ts` when Builder returns
   nothing — needs care so Builder's preview mode still works.
2. **`svelte-check` reports 2 errors**, down from 48. Both are the same Svelte
   limitation: `<svelte:element>` doesn't accept `href` in its typings
   (`Button.svelte`, `LogoItem.svelte`). Runtime behaviour is correct.
