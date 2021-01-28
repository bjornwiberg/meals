import { render, screen } from '@testing-library/react';
import Home from './';

describe('Home', () => {
  test('renders properly', () => {
    render(<Home />);
    const text = screen.getByText(
      /Hi and welcome to this meal app, here you can look for meals by catogory, get a random meal and much more./i
    );
    expect(text).toBeInTheDocument();
  });
});
