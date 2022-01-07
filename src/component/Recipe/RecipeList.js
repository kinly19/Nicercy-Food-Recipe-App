import Carousel from "../UI/Carousel";
import RecipeItems from "./RecipeItems";
import "./RecipeList.scss";

const RecipeList = (props) => {
  return (
    <section className="recipeList">
      <h1 className="recipeList__title">{props.title}</h1>
      <p className="recipeList__text">{props.subTitle}</p>
      <div className="recipeList__items">
        <Carousel>
          {props.data.map((recipeItems) => (
            <RecipeItems
              key={recipeItems.id}
              id={recipeItems.id}
              backgroundUrl={recipeItems.image}
              title={recipeItems.title}
              min={recipeItems.readyIn}
              servings={recipeItems.servings}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default RecipeList;