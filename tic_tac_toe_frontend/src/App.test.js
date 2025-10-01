import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title and restart button', () => {
  render(<App />);
  expect(screen.getByText(/Tic‑Tac‑Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart game/i })).toBeInTheDocument();
});
