import { fireEvent, render, waitForElementToBeRemoved, within } from '@testing-library/react';
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
    expect(within(meals[0]).getByTestId('meal-link').getAttribute('href')).toBe(`/meal/${mockMeals.meals[0].idMeal}`);
    expect(within(meals[0]).getByTestId('meal-thumbnail').getAttribute('src')).toBe(mockMeals.meals[0].strMealThumb);
    expect(within(meals[0]).getByTestId('meal-thumbnail').getAttribute('alt')).toBe(mockMeals.meals[0].strMeal);
    expect(getByText(mockMeals.meals[1].strMeal)).toBeInTheDocument();
    expect(within(meals[1]).getByTestId('meal-link').getAttribute('href')).toBe(`/meal/${mockMeals.meals[1].idMeal}`);
    expect(within(meals[1]).getByTestId('meal-thumbnail').getAttribute('src')).toBe(mockMeals.meals[1].strMealThumb);
    expect(within(meals[1]).getByTestId('meal-thumbnail').getAttribute('alt')).toBe(mockMeals.meals[1].strMeal);
  });

  test('should filter result properly', async () => {
    apiCaller.get = jest.fn().mockResolvedValue({ json: () => mockMeals });
    const { findByText, getByTestId, getByText } = render(
      <MemoryRouter initialEntries={['/category/Test']}>
        <Category />
      </MemoryRouter>
    );
    const firstMeal = mockMeals.meals[0].strMeal;
    await findByText(firstMeal);
    const search = getByTestId('search-category');
    const getFirstMeal = getByText(firstMeal);

    expect(getFirstMeal).toBeInTheDocument();

    // Make a search
    fireEvent.change(search, { target: { value: 'Cajun' } });
    await waitForElementToBeRemoved(getFirstMeal);

    // Remove the search
    fireEvent.change(search, { target: { value: '' } });
    expect(await findByText(firstMeal)).toBeInTheDocument();
  });
});
