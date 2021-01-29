import { render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import MealCard from '.';

describe('MealCard', () => {
  test('renders properly', async () => {
    const id = '52959';
    const thumbnail = 'https://www.themealdb.com/images/media/meals/1548772327.jpg';
    const name = 'Baked salmon with fennel & tomatoes';
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <MealCard id={id} name={name} thumbnail={thumbnail} />
      </MemoryRouter>
    );
    const meal = getByTestId('meal-card');

    expect(getByText(name)).toBeInTheDocument();
    expect(within(meal).getByTestId('meal-card-link').getAttribute('href')).toBe(`/meal/${id}`);
    expect(within(meal).getByTestId('meal-card-thumbnail').getAttribute('src')).toBe(thumbnail);
    expect(within(meal).getByTestId('meal-card-thumbnail').getAttribute('alt')).toBe(name);
  });
});
