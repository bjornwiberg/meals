import { render, screen } from '@testing-library/react';
import Home from './';

describe('Home', () => {
  test('renders properly', () => {
    render(<Home />);
    const text = screen.getByText(
      /Hi and welcome to this meal app, here you can browse for meals by catogory, get a random meal or search for a meal below./i
    );
    expect(text).toBeInTheDocument();
  });
});
