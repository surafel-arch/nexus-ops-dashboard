# BoothStop website

Static site. No build step. Open `index.html` or host the folder on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Files

| File | What it is |
|---|---|
| `index.html` | All page content and copy |
| `styles.css` | Design |
| `app.js` | Behavior (menu, form, gallery, dialogs) |
| `config.js` | Settings you change: form endpoint, contact info, prices, gallery list |
| `images/` | Your photos |

## Photos

Upload photos with these exact names. Until a file exists, the site shows a styled placeholder.

| File | Where it shows | Best format |
|---|---|---|
| `images/hero.jpg` | Home hero background | Landscape, 2000px+ wide, real event, guests on the 360 booth |
| `images/hero.mp4` | Optional hero video on top of the photo | Short muted 360 clip, under 5 MB |
| `images/360-booth.jpg` | 360 Video Booth card | Any shape. Shown in full on a light backdrop |
| `images/digital-booth.jpg` | Digital Photo Booth card | Any shape |
| `images/fog-machine.jpg` | Fog machine card | Any shape |
| `images/air-cooler.jpg` | Event cooler card | Any shape |

Gallery photos go in `images/gallery/` and get listed in `config.js`.

## Before launch

1. Put the site online (for example, drag the folder onto app.netlify.com/drop). The form does not send from a file opened on your computer.
2. Send one test request from the live site. FormSubmit emails an activation link to boothstop@gmail.com. Click it. Requests are not delivered until you do.
3. Send a second test request and confirm it arrives.
4. Optional: FormSubmit's activation email includes a random alias address. Replace `boothstop@gmail.com` in `formEndpoint` with that alias to keep your address out of the page source.
5. Add phone, email, and Instagram in `config.js`.
6. Replace manufacturer photos with photos of your own equipment.
7. Unhide `#testimonials` and `#service-area` in `index.html` only when you have real content.

## Booking pipeline

Every form submission includes `reference` (for example `BS-20270612-K3F9`) and `status: "inquiry"`. Track each request through these statuses in whatever tool receives it:

```
inquiry
  → availability_checked   (or: unavailable → offer another date or item)
  → quoted                 (quote has an expiry date. A quote does NOT hold the date.)
  → contract_sent          (agreement + deposit invoice sent as one link)
  → deposit_paid           (date is now held. First deposit wins.)
  → confirmed              (details locked: arrival time, power, space, venue rules)
  → balance_paid           (recommended: before event day, not after)
  → event_completed
  → equipment_checked      (returned, cleaned, damage noted)
  → closed                 (send gallery link, ask for a review)

Side exits: lost (no reply, quote expired), cancelled (apply agreement terms)
```

Availability is per item, per date, including setup, travel, and teardown time:
one 360 booth, one digital booth, one fog machine, two air coolers.
