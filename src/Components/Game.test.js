import { render, screen } from '@testing-library/react';
import Game from './Game';
import '@testing-library/jest-dom';

test('renders 12 game cards', () => {
  render(<Game />);
  const gameCards = screen.getAllByRole('img', { name: /card front/i });
  expect(gameCards).toHaveLength(12);
});