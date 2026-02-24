# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static website displaying a digital clock. The default view is intentionally minimalist: just HH:MM:SS updating every second. A settings menu enables optional features.

## Tech Stack

- HTML, CSS, and JavaScript
- Client-side frameworks allowed (e.g., React, Vue, Svelte via CDN)
- Responsive design for all screen sizes (mobile, tablet, desktop, TV)
- All files served statically (works with any static web host)

## Development

Enter the development environment:
```
nix develop
```

This provides python3, jq, curl, git, gh, and nodejs.

Serve locally:
```
python3 -m http.server 8000
```

Or open `index.html` directly in a browser.

## Architecture

- `index.html` - Main page structure
- `style.css` - Styling, theming, and responsive breakpoints
- `script.js` - Clock logic and settings management

## Features

**Default view:** Large centered digital clock (HH:MM:SS), scales to fill available space

**Settings menu options:**
- Analog clock display
- Date display
- Time zone selection
- Font choices
- Color choices (text, background)
- Background image

Settings should persist in localStorage.
