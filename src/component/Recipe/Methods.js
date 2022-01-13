import "./Methods.scss";

const Methods = (props) => {

  const methodList = props.data[0].instructions;
  let count = 0;
  
  return (
    <div className="method">
      <h2>Methods</h2>
      <ul className="method__list">
        {methodList.map((subArr) =>
          subArr.steps.map((item) => {
            count++;
            return (
              <li className="method__listItem">
                <h2>{count}.</h2>
                <p>{item.step}</p>
              </li>
            );
          })

         
        )}
      </ul>
    </div>
  );
};

export default Methods;
