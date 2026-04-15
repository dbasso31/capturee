# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Capturée** is a static photo-song blog by David Basso (photography) and Jérôme Echenoz (music selection). The concept: 1 week, 1 picture, 1 song. There is no build system, no package manager, and no server-side code — everything is plain HTML, CSS, and JavaScript served statically.

## Site Structure

The site has three distinct sections, each self-contained with its own `js/`, `css/`, `assets/`, `img/`, and `audio/` directories:

- **Root (`/`)** — Landing page (`index.html`) with a jCarousel showcasing thumbnails from each section.
- **`weekly/`** — The recurring weekly series (`weekly.html` at root). Each entry is an `<a>` tag inside `#thumbs1` with custom attributes (`song`, `titleArtiste`, `titleTrack`, `titleLabel`, `titleYear`, `dark`) that drive the display and audio.
- **`kneeandshoulder/`** — Special series from 2013. Same structure as the weekly section.
- **`calvi2012/`** — Special series from Calvi On The Rocks festival 2012. Has an intro page (`index.html`) that links to the gallery (`index2.html`).

## How Content Works

### Image + Audio pairing
Content entries live entirely in the HTML as `<a>` tags within a `<fieldset id="thumbs1">`. Each link carries:
- `href` — path to the full-resolution photo
- `song` — filename (without `.mp3`) under the local `audio/` directory
- `titleArtiste`, `titleTrack`, `titleLabel`, `titleYear` — metadata displayed in the dock
- `dark` — CSS class applied to control overlay appearance (`white`, `fond`, `fondblack`)

### Audio playback
- **Desktop**: uses SWF Flash player (`audio.swf`) via `swfobject.js`
- **Mobile (iOS/webOS)**: falls back to the HTML5 `<Audio>` API

Audio is triggered by `superbgimage_show()` in the inline script of each section's HTML. When a photo transitions in, the corresponding song URL is constructed and passed to the player.

### Background image plugin
`jquery.superbgimageCADRE.min.js` (custom fork of SuperBGImage) handles fullscreen photo display with transitions. It is initialized in the inline `<script>` of each section page and controlled via `fs.js` (prev/next/slideshow controls) and `dockCADRE.js` (dock slide-in animation).

## Adding a New Entry

1. Add the photo to `img/` (sized appropriately — the plugin scales to fill the viewport).
2. Add the MP3 to `audio/`.
3. In `weekly.html`, add a new `<a>` tag inside `#thumbs1` with the correct attributes.
4. Update the thumbnail carousels on `index.html` (`#mycarousel`) with a new `<li><img>` entry.

## Key Files

| File | Purpose |
|---|---|
| `js/dockCADRE.js` | Animates the info dock panel on page load |
| `js/fs.js` | Wires prev/next/slideshow controls to the SuperBGImage plugin |
| `js/dockCADRE.js` | Dock fade-in and resize logic |
| `js/popover.js` | Mobile "touch me" popover for iOS audio unlock |
| `js/swfobject.js` | Flash embed for desktop audio player |
| `css/cssCADRE.css` | Layout for the fullscreen photo + dock sections |
| `css/dockCADRE.css` | Dock panel styles |

## No Build Step

To preview locally, serve the root with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
