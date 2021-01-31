import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchMeals from '.';
import useMealsFromSearchString from '../../hooks/useMealsFromSearchString';

jest.mock('../../hooks/useMealsFromSearchString');

const mockMeals = {
  meals: [
    {
      id: '52977',
      name: 'Corba',
      thumbnail: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    },
    {
      id: '52978',
      name: 'Kumpir',
      thumbnail: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    },
  ],
};

describe('SearchMeals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', () => {
    useMealsFromSearchString.mockImplementation(() => ({
      loading: false,
      meals: [],
    }));
    render(<SearchMeals />);
    const searchInput = screen.getByPlaceholderText('Search for meals');

    expect(searchInput).toBeInTheDocument();
  });

  test('show message when loading', () => {
    useMealsFromSearchString.mockImplementation(() => ({
      loading: true,
      meals: [],
    }));

    render(<SearchMeals />);
    const searchInput = screen.getByPlaceholderText('Search for meals');
    fireEvent.change(searchInput, { target: { value: 'Search' } });
    expect(screen.getByText('Searching for meals...')).toBeInTheDocument();
  });

  test('renders meal cards properly', async () => {
    useMealsFromSearchString.mockImplementation(() => ({
      loading: false,
      meals: mockMeals.meals,
    }));

    render(
      <MemoryRouter>
        <SearchMeals />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search for meals');
    fireEvent.change(searchInput, { target: { value: 'Search' } });
    const meals = await screen.findAllByTestId('meal-card');

    expect(meals.length).toBe(mockMeals.meals.length);
    expect(screen.getByText(mockMeals.meals[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockMeals.meals[1].name)).toBeInTheDocument();
  });

  test('show message when search returns no results', async () => {
    useMealsFromSearchString.mockImplementation(() => ({
      loading: false,
      meals: [],
    }));

    render(<SearchMeals />);
    const searchInput = screen.getByPlaceholderText('Search for meals');
    fireEvent.change(searchInput, { target: { value: 'Search' } });

    const noResults = await screen.findByTestId('no-results');
    expect(noResults.textContent).toBe('No meals found when searching for Search');
  });
});
