import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Category from '.';

import * as apiCaller from '../../utils/apiCaller';

const mockMeals = {
  meals: [
    {
      strMeal: 'Baked salmon with fennel & tomatoes',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
      idMeal: '52959',
    },
    {
      strMeal: 'Cajun spiced fish tacos',
      strMealThumb: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
      idMeal: '52819',
    },
  ],
};

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', async () => {
    apiCaller.get = jest.fn().mockResolvedValue({ json: () => mockMeals });
    const { findAllByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/category/Test']}>
        <Category />
      </MemoryRouter>
    );
    const meals = await findAllByTestId('meal');

    expect(meals.length).toBe(mockMeals.meals.length);
    expect(getByText(mockMeals.meals[0].strMeal)).toBeInTheDocument();
    expect(getByText(mockMeals.meals[1].strMeal)).toBeInTheDocument();
  });
});
