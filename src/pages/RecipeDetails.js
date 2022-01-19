import Layout from "../component/Layout/Layout";
import RecipeInfo from "../component/Recipe/RecipeInfo";

const RecipeDetails = () => {
  window.scrollTo(0,0);

  return (
    <Layout>
      <RecipeInfo />
    </Layout>
  );
};

export default RecipeDetails;