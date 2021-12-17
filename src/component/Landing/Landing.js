import './Landing.scss';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__header">
        <h1>Nicercy</h1>
        <h2>Cooking Made Easy</h2>
        <p>
          Search over thousands of recipes. Its so simple... even your kids can do it
        </p>
      </div>
      <div className="landing__form">
        {/* search form should go inside here */}
        <h3>Add search bar here</h3>
      </div>
    </div>
  );
};

export default Landing;