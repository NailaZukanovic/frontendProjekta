import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import SingleCard from './SingleCard';
import '@testing-library/jest-dom';

test('calls handleChoice when card clicked', () => {
  const mockHandleChoice = jest.fn();
  const fakeCardData = {
    id: '1',
    src: 'https://dummyimage.com/50.png',
  };
  render(
    <SingleCard
      card={fakeCardData}
      handleChoice={mockHandleChoice}
      flipped={false}
      disabled={false}
    />
  );

  const view = screen.getByTestId('1');
  const card = within(view).getByRole('img', {
    name: /cover/i,
  });

  user.click(card);

  expect(mockHandleChoice).toHaveBeenCalled();
  expect(mockHandleChoice).toHaveBeenCalledTimes(1);
});