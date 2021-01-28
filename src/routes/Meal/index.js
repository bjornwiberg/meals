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

  const {
    name,
    drinkAlternative,
    category,
    area,
    instructions,
    thumbnail,
    tags,
    youtube,
    ingridients,
    source,
    modified,
  } = meal;

  return (
    <div className="meal" data-testid="meal">
      <div className="meal--image">
        <img alt={name} data-testid="meal-image" src={thumbnail} />
      </div>
      <div className="meal--name">{name}</div>
      {instructions && <div className="meal--instructions">{instructions}</div>}
      {area && (
        <div className="meal--area">
          <div className="meal--data-title">Area:</div> <div className="meal--data-value">{area}</div>
        </div>
      )}
      {drinkAlternative && (
        <div className="meal--drink-alternative">
          <div className="meal--data-title">Drink alternative:</div>
          <div className="meal--data-value">{drinkAlternative}</div>
        </div>
      )}
      {category && (
        <div className="meal--category ">
          <div className="meal--data-title">Category:</div>
          <div className="meal--data-value">{category}</div>
        </div>
      )}
      {tags && (
        <div className="meal--tags ">
          <div className="meal--data-title">Tags:</div>
          <div className="meal--data-value">{tags}</div>
        </div>
      )}
      {youtube && (
        <div className="meal--youtube ">
          <iframe
            allowFullScreen
            data-testid="meal-youtube"
            frameBorder="0"
            height="315"
            src={`https://www.youtube-nocookie.com/embed/${youtube.split('=')[1]}`}
            title={`Video of ${name}}`}
            width="560"
          ></iframe>
        </div>
      )}
      {ingridients && (
        <div className="meal--ingridients">
          Ingridients:
          {ingridients.map(({ ingridientName, measure }) => (
            <div className="meal--ingridient" key={`${ingridientName}${measure}`}>
              <div className="meal--ingridient-name">{ingridientName}</div>
              <div className="meal--measure">{measure}</div>
            </div>
          ))}
        </div>
      )}
      {source && (
        <div className="meal--source ">
          <div className="meal--data-title">Source:</div>
          <div className="meal--data-value">
            <a data-testid="meal-source" href={source} rel="noopener noreferrer nofollow" target="_blank">
              {source}
            </a>
          </div>
        </div>
      )}
      {modified && (
        <div className="meal--modified ">
          <div className="meal--data-title">Modified:</div>
          <div className="meal--data-value">{modified}</div>
        </div>
      )}
    </div>
  );
};

export default Meal;
