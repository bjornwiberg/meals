import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Navigation from '.';

import * as apiCaller from '../../utils/apiCaller';

const mockCategories = {
  categories: [
    {
      idCategory: '1',
      strCategory: 'Beef',
      strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png',
      strCategoryDescription:
        'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
    },
    {
      idCategory: '2',
      strCategory: 'Chicken',
      strCategoryThumb: 'https://www.themealdb.com/images/category/chicken.png',
      strCategoryDescription:
        'Chicken is a type of domesticated fowl, a subspecies of the red junglefowl. It is one of the most common and widespread domestic animals, with a total population of more than 19 billion as of 2011.[1] Humans commonly keep chickens as a source of food (consuming both their meat and eggs) and, more rarely, as pets.',
    },
  ],
};

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders properly', async () => {
    apiCaller.get = jest.fn().mockResolvedValue({ json: () => mockCategories });
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const categories = await screen.findAllByTestId('category-link');

    expect(categories.length).toBe(mockCategories.categories.length);
    expect(screen.getByText(mockCategories.categories[0].strCategory)).toBeInTheDocument();
    expect(screen.getByText(mockCategories.categories[1].strCategory)).toBeInTheDocument();
  });
});
