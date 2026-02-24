# Clock

[![CI](https://github.com/pastor-robert/clock/actions/workflows/test.yml/badge.svg)](https://github.com/pastor-robert/clock/actions/workflows/test.yml)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://pastor-robert.github.io/clock/)

A minimalist digital clock for your browser.

**Live demo:** https://pastor-robert.github.io/clock/

## Features

- Large centered digital clock (HH:MM:SS) that scales to fill the screen
- Settings menu with optional features:
  - Analog clock display
  - Date display
  - Time zone selection
  - Font and color customization
  - Background image
- Settings persist in localStorage
- Responsive design for all screen sizes

## Usage

Open `index.html` in a browser, or serve with any static web server:

```bash
python3 -m http.server 8000
```

## Development

```bash
# Enter development environment (requires Nix)
nix develop

# Install pre-commit hook
./scripts/setup-hooks.sh

# Run linting
npm install
npm test
```

This project was entirely written by Claude (Anthropic) using Claude Code.

## License

Public domain. See [LICENSE](LICENSE).
