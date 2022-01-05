import "./RecipeList.scss";

const RecipeList = (props) => {
  return (
    <section className="recipeList">
      <h1 className="recipeList__title">{props.title}</h1>
      <p className="recipeList__text">{props.subTitle}</p>
      <div className="recipeList__items">{props.children}</div>
    </section>
  );
};

export default RecipeList;