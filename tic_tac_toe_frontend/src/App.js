import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Ocean Professional Styled Tic-Tac-Toe against Computer
 * - Interactive board with animations and win highlighting
 * - Status display for turn and results
 * - Restart button
 * - Minimalist, modern, centered layout using the provided color palette
 */

// Theme tokens per style guide
const THEME = {
  name: 'Ocean Professional',
  primary: '#2563EB', // blue
  secondary: '#F59E0B', // amber
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  gradientA: '#3b82f680', // blue-500/50
  gradientB: '#f3f4f6', // gray-100
};

// Utility: all winning line indices
const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Compute winner and winning line
function calculateWinner(squares) {
  for (const [a, b, c] of WIN_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

// Simple AI: tries to win, then block, then take center, corner, side
function aiMove(squares, ai = 'O', human = 'X') {
  // Try to win
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const copy = squares.slice();
      copy[i] = ai;
      if (calculateWinner(copy).winner === ai) return i;
    }
  }
  // Try to block human
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) {
      const copy = squares.slice();
      copy[i] = human;
      if (calculateWinner(copy).winner === human) return i;
    }
  }
  // Center
  if (!squares[4]) return 4;
  // Corners
  const corners = [0, 2, 6, 8].filter(i => !squares[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  // Sides
  const sides = [1, 3, 5, 7].filter(i => !squares[i]);
  if (sides.length) return sides[Math.floor(Math.random() * sides.length)];
  return null;
}

// Square Component
function Square({ value, onClick, isWinning, disabled }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      disabled={disabled || !onClick}
      aria-label={`Square ${value ? value : 'empty'}`}
      data-winning={isWinning ? 'true' : 'false'}
    >
      {value}
    </button>
  );
}

// Board Component
function Board({ squares, onSquareClick, winningLine, disabledAll }) {
  return (
    <div className="ttt-grid" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          onClick={() => onSquareClick(idx)}
          isWinning={winningLine.includes(idx)}
          disabled={disabledAll || Boolean(val)}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Game state */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Human is X
  const [aiEnabled] = useState(true); // single player fixed
  const [isThinking, setIsThinking] = useState(false);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const movesLeft = useMemo(() => squares.some(s => !s), [squares]);
  const isGameOver = Boolean(winner) || !movesLeft;

  // AI Turn: when it's O's turn and aiEnabled, make a move
  useEffect(() => {
    if (!aiEnabled || isGameOver || isXNext) return;
    setIsThinking(true);
    const t = setTimeout(() => {
      const idx = aiMove(squares, 'O', 'X');
      if (idx !== null) {
        setSquares(prev => {
          if (prev[idx]) return prev; // guard
          const next = prev.slice();
          next[idx] = 'O';
          return next;
        });
      }
      setIsThinking(false);
      setIsXNext(true);
    }, 450); // subtle delay for UX
    return () => clearTimeout(t);
  }, [aiEnabled, isGameOver, isXNext, squares]);

  // Handle human move
  const handleSquareClick = (idx) => {
    if (isGameOver || isThinking) return;
    if (squares[idx]) return;
    if (!isXNext) return; // not player's turn
    setSquares(prev => {
      const next = prev.slice();
      next[idx] = 'X';
      return next;
    });
    setIsXNext(false);
  };

  // PUBLIC_INTERFACE
  const restart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setIsThinking(false);
  };

  // Status message
  let status = '';
  if (winner) {
    status = winner === 'X' ? 'You win! 🎉' : 'Computer wins. 🤖';
  } else if (!movesLeft) {
    status = "It's a draw. 🤝";
  } else {
    status = isXNext ? 'Your turn (X)' : 'Computer thinking…';
  }

  return (
    <div className="ocean-app" style={getAppStyle()}>
      <div className="ocean-card">
        <header className="ocean-header">
          <h1 className="ocean-title">Tic‑Tac‑Toe</h1>
          <p className="ocean-subtitle">Ocean Professional • Play against the computer</p>
        </header>

        <main className="ocean-main">
          <Board
            squares={squares}
            onSquareClick={handleSquareClick}
            winningLine={line}
            disabledAll={isGameOver || isThinking || !isXNext}
          />

          <div
            className="ocean-status"
            role="status"
            aria-live="polite"
            data-variant={
              winner ? (winner === 'X' ? 'success' : 'error') : movesLeft ? 'neutral' : 'neutral'
            }
          >
            {status}
          </div>

          <button
            className="ocean-button"
            onClick={restart}
            aria-label="Restart game"
          >
            Restart Game
          </button>
        </main>

        <footer className="ocean-footer">
          <small>You are X • Computer is O</small>
        </footer>
      </div>
    </div>
  );
}

// Styles in JS for layout colors; most visual styles are in App.css for maintainability
function getAppStyle() {
  return {
    '--ocean-primary': THEME.primary,
    '--ocean-secondary': THEME.secondary,
    '--ocean-success': THEME.success,
    '--ocean-error': THEME.error,
    '--ocean-bg': THEME.background,
    '--ocean-surface': THEME.surface,
    '--ocean-text': THEME.text,
    '--ocean-grad-a': THEME.gradientA,
    '--ocean-grad-b': THEME.gradientB,
  };
}

export default App;
