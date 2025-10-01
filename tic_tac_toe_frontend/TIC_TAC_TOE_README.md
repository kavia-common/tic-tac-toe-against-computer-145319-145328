# Tic-Tac-Toe (Ocean Professional)

A modern React implementation of Tic‑Tac‑Toe where the user (X) plays against a computer (O).

## Features
- Interactive 3x3 grid with smooth hover/press transitions
- Status display: whose turn, win/lose/draw messages
- Restart button to reset the game
- Win line highlighting with amber accents
- Centered layout with a modern “Ocean Professional” theme:
  - Blue primary (#2563EB) and amber secondary (#F59E0B)
  - Minimalist design, subtle gradients and shadows, rounded corners

## Tech
- React 18
- No external UI libraries, no environment variables

## Run locally
- npm start
- npm test
- npm run build

## File structure
- src/App.js — main app with board, AI, and game state
- src/App.css — Ocean Professional theme and components
- src/index.js|index.css — app bootstrap and base resets

## Notes
- AI uses a simple strategy: win > block > center > corner > side
- All UI colors can be adjusted via CSS variables in App.js/App.css
