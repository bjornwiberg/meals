import React, { useEffect, useState } from 'react';
import { get } from '../../utils/apiCaller';
import './Meal.scss';
import { useParams } from 'react-router-dom';

const getMealFromId = async (id) => {
  const response = await get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const {
    meals: [
      {
        idMeal,
        strMeal,
        strDrinkAlternate,
        strCategory,
        strArea,
        strInstructions,
        strMealThumb,
        strTags,
        strYoutube,
        strSource,
        dateModified,
        ...ingredientsAndMeasures
      },
    ],
  } = await response.json();

  return {
    id: idMeal,
    name: strMeal,
    drinkAlternative: strDrinkAlternate,
    category: strCategory,
    area: strArea,
    instructions: strInstructions,
    thumbnail: strMealThumb,
    tags: strTags,
    youtube: strYoutube,
    ingridients: Array.from(Array(20), (_, i) => ({
      ingridientName: ingredientsAndMeasures[`strIngredient${i + 1}`],
      measure: ingredientsAndMeasures[`strMeasure${i + 1}`],
    })).filter(({ ingridientName }) => !!ingridientName),
    source: strSource,
    modified: dateModified,
  };
};

const Meal = () => {
  const [meal, setMeal] = useState({});
  const { mealId } = useParams();

  useEffect(() => {
    getMealFromId(mealId).then((newMail) => {
      setMeal(newMail);
    });
  }, [mealId]);

  const { name, drinkAlternative, category, area, instructions, thumbnail, tags, youtube, ingridients, source } = meal;

  return (
    <div className="meal-page" data-testid="meal">
      <h1 className="meal--name">{name}</h1>
      <div className="meal--image">
        <img alt={name} data-testid="meal-image" src={thumbnail} />
      </div>
      {instructions && (
        <div className="meal--instructions">
          <h2>Instructions</h2>
          <div className="box-shadow">
            <div className="meal--instructions-content">{instructions}</div>
          </div>
        </div>
      )}
      <div className="meal--info">
        <h2>Information</h2>
        <div className="meal--info-grid">
          {area && (
            <div className="box-shadow">
              <div className="meal--data meal--area">
                <div className="meal--data-title">Area</div> <div className="meal--data-value">{area}</div>
              </div>
            </div>
          )}
          {drinkAlternative && (
            <div className="box-shadow">
              <div className="meal--data meal--drink-alternative">
                <div className="meal--data-title">Drink alternative</div>
                <div className="meal--data-value">{drinkAlternative}</div>
              </div>
            </div>
          )}
          {category && (
            <div className="box-shadow">
              <div className="meal--data meal--category ">
                <div className="meal--data-title">Category</div>
                <div className="meal--data-value">{category}</div>
              </div>
            </div>
          )}
          {tags && (
            <div className="box-shadow">
              <div className="meal--data meal--tags ">
                <div className="meal--data-title">Tags</div>
                <div className="meal--data-value">
                  {tags.split(',').map((tag) => (
                    <div className="meal--tag" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {ingridients && (
        <div className="meal--ingridients">
          <h2>Ingridients</h2>
          <div className="box-shadow">
            {ingridients.map(({ ingridientName, measure }) => (
              <div className="meal--ingridient" key={`${ingridientName}${measure}`}>
                <div className="meal--ingridient-name">{ingridientName}</div>
                <div className="meal--ingridient-measure">{measure}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {youtube && (
        <div className="meal--video ">
          <h2>Video</h2>
          <div className="meal--youtube ">
            <iframe
              allowFullScreen
              data-testid="meal-youtube"
              frameBorder="0"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${youtube.split('=')[1]}`}
              title={`Video of ${name}}`}
              width="100%"
            ></iframe>
          </div>
        </div>
      )}
      {source && (
        <>
          <h2>Source:</h2>
          <a data-testid="meal-source" href={source} rel="noopener noreferrer nofollow" target="_blank">
            {source}
          </a>
        </>
      )}
    </div>
  );
};

export default Meal;
