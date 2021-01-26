import { render, screen } from '@testing-library/react';
import Home from './';

describe('Home', () => {
  test('renders properly', () => {
    render(<Home />);
    const text = screen.getByText(/home/i);
    expect(text).toBeInTheDocument();
  });
});
