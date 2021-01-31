import { getDefaultNormalizer, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Meal from '.';

import * as apiCaller from '../../utils/apiCaller';

const mockRandomMeals = [
  {
    idMeal: '52848',
    strMeal: 'Bean & Sausage Hotpot',
    strDrinkAlternate: null,
    strCategory: 'Miscellaneous',
    strArea: 'British',
    strInstructions:
      'In a large casserole, fry the sausages until brown all over – about 10 mins.\r\n\r\nAdd the tomato sauce, stirring well, then stir in the beans, treacle or sugar and mustard. Bring to the simmer, cover and cook for 30 mins. Great served with crusty bread or rice.',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg',
    strTags: null,
    strYoutube: 'https://www.youtube.com/watch?v=B0YX0yPX4Wo',
    strIngredient1: 'Sausages',
    strIngredient2: 'Tomato Sauce',
    strIngredient3: 'Butter Beans',
    strIngredient4: 'Black Treacle',
    strIngredient5: 'English Mustard',
    strIngredient6: '',
    strIngredient7: '',
    strIngredient8: '',
    strIngredient9: '',
    strIngredient10: '',
    strIngredient11: '',
    strIngredient12: '',
    strIngredient13: '',
    strIngredient14: '',
    strIngredient15: '',
    strIngredient16: '',
    strIngredient17: '',
    strIngredient18: '',
    strIngredient19: '',
    strIngredient20: '',
    strMeasure1: '8 large',
    strMeasure2: '1 Jar',
    strMeasure3: '1200g',
    strMeasure4: '1 tbls',
    strMeasure5: '1 tsp ',
    strMeasure6: '',
    strMeasure7: '',
    strMeasure8: '',
    strMeasure9: '',
    strMeasure10: '',
    strMeasure11: '',
    strMeasure12: '',
    strMeasure13: '',
    strMeasure14: '',
    strMeasure15: '',
    strMeasure16: '',
    strMeasure17: '',
    strMeasure18: '',
    strMeasure19: '',
    strMeasure20: '',
    strSource: 'https://www.bbcgoodfood.com/recipes/339607/bean-and-sausage-hotpot',
    dateModified: null,
  },
];

describe('Meal', () => {
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
      <MemoryRouter initialEntries={['/meal/52772']}>
        <Meal />
      </MemoryRouter>
    );
    await screen.findByTestId('meal');
    const image = screen.getByTestId('meal-image');
    const source = screen.getByTestId('meal-source');
    const youtube = screen.getByTestId('meal-youtube');

    // check special elemets
    expect(image.getAttribute('src')).toBe(mockRandomMeals[0].strMealThumb);
    expect(image.getAttribute('alt')).toBe(mockRandomMeals[0].strMeal);
    expect(source.getAttribute('href')).toBe(mockRandomMeals[0].strSource);
    expect(source.innerHTML).toBe(mockRandomMeals[0].strSource);
    expect(youtube.getAttribute('src')).toBe(
      `https://www.youtube-nocookie.com/embed/${mockRandomMeals[0].strYoutube.split('=')[1]}`
    );

    // check texts
    Object.entries(mockRandomMeals[0])
      // filter out empty values and unwanted keys
      .filter(([key, value]) => !!value && key !== 'idMeal' && key !== 'strYoutube' && key !== 'strMealThumb')
      .forEach(([_, value]) => {
        expect(
          screen.getAllByText(value, {
            normalizer: getDefaultNormalizer({ collapseWhitespace: false, trim: false }),
          }).length > 0
        ).toBeTruthy();
      });
  });
});
