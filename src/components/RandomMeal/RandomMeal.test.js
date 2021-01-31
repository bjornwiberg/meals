import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RandomMeal from '.';

import * as apiCaller from '../../utils/apiCaller';

const mockRandomMeals = [
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
];

describe('Category', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', async () => {
    apiCaller.get = jest.fn().mockResolvedValue({
      json: () => ({
        meals: [mockRandomMeals[0]],
      }),
    });
    render(
      <MemoryRouter>
        <RandomMeal />
      </MemoryRouter>
    );
    await screen.findByTestId('random-meal');
    const link = screen.getByTestId('random-meal-link');
    const image = screen.getByTestId('random-meal-image');

    expect(screen.getByText(mockRandomMeals[0].strMeal)).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/meal/${mockRandomMeals[0].idMeal}`);
    expect(image.getAttribute('src')).toBe(mockRandomMeals[0].strMealThumb);
    expect(image.getAttribute('alt')).toBe(mockRandomMeals[0].strMeal);
    expect(screen.getByText('refresh')).toBeInTheDocument();
  });

  test('should fetch a new random meal when clicking on refresh', async () => {
    apiCaller.get = jest
      .fn()
      .mockReturnValueOnce({
        json: () => ({
          meals: [mockRandomMeals[0]],
        }),
      })
      .mockReturnValueOnce({
        json: () => ({
          meals: [mockRandomMeals[1]],
        }),
      });
    render(
      <MemoryRouter>
        <RandomMeal />
      </MemoryRouter>
    );
    await screen.findByTestId('random-meal');
    const link = screen.getByTestId('random-meal-link');
    const image = screen.getByTestId('random-meal-image');
    const refresh = screen.getByTestId('random-meal-refresh');

    // first fetch of random image
    expect(screen.getByText(mockRandomMeals[0].strMeal)).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/meal/${mockRandomMeals[0].idMeal}`);
    expect(image.getAttribute('src')).toBe(mockRandomMeals[0].strMealThumb);
    expect(image.getAttribute('alt')).toBe(mockRandomMeals[0].strMeal);

    // click on refresh
    fireEvent.click(refresh);

    await waitFor(() => expect(apiCaller.get).toHaveBeenCalledTimes(2));

    // second fetch of random image
    expect(screen.getByText(mockRandomMeals[1].strMeal)).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe(`/meal/${mockRandomMeals[1].idMeal}`);
    expect(image.getAttribute('src')).toBe(mockRandomMeals[1].strMealThumb);
    expect(image.getAttribute('alt')).toBe(mockRandomMeals[1].strMeal);
  });
});
