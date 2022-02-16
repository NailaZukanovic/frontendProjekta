import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import '@testing-library/jest-dom';

test('renders', () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
  const menu = screen.getByRole('list');
  const gameMenuLink = within(menu).getByRole('button', {
    name: /game/i,
  });
  const nayerLogo = screen.getByRole('heading', { name: /nayer/i });
  const loginSignupButton = screen.getByRole('button', {
    name: /login\/signup/i,
  });

  expect(gameMenuLink).toBeInTheDocument();
  expect(nayerLogo).toBeInTheDocument();
  expect(loginSignupButton).toBeInTheDocument();
});