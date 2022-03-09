import { useState } from 'react';
import './Ingredients.scss';

const Ingredients = (props) => {

  const initialServings = props.data[0].servings;

  const [upDatedServings, setUpDatedServings] = useState(initialServings);

  const ingredientsList = props.data[0].ingredients.map((recipeItem) => {
    return {
      amount: recipeItem.measures.metric.amount,
      name: recipeItem.nameClean || recipeItem.originalName,
      units: recipeItem.measures.metric.unitShort,
      meta:
        recipeItem.meta.length > 0
          ? `(${recipeItem.meta[0].replace(/[()]/g, "")})`
          : "",
    };
  });

  const adjustAmountHandler = (initialValue, adjustedServings) => {
    let adjustBy = initialValue / initialServings;
    let adjustedAmount = adjustBy * adjustedServings;
    
    if (Number.isInteger(adjustedAmount)) {
      return adjustedAmount
    }
    return adjustedAmount.toFixed(2);
  }

  const incrementHandler = () => {
    setUpDatedServings((prevState) => prevState + 1);
  };

  const decrementHandler = () => {
    setUpDatedServings((prevState) => prevState - 1);
  };

  return (
    <div className="ingredients">
      <h2>Ingredients</h2>
      <ul className="ingredients__items">
        {ingredientsList.map((item, index) => (
          <li key={index}>
            <span>
              {adjustAmountHandler(item.amount, upDatedServings)} {item.units}
            </span>{" "}
            {item.name} {item.meta}
          </li>
        ))}
      </ul>
      <div className="ingredients__actions">
        <h3>Adjust Servings</h3>
        <p>{upDatedServings}</p>
        <button onClick={decrementHandler}>-</button>
        <button onClick={incrementHandler}>+</button>
      </div>
    </div>
  );
};

export default Ingredients;