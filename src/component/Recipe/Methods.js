import './Methods.scss';

const Methods = (props) => {

  const methodList = props.data[0].instructions[0].steps.map((methodItem, index) => {
    return {
      index: index +1,
      step: methodItem.step
    }
  })
  return (
    <div className='method'>
      <h2>Methods</h2>
      <ul className='method__list'>
        {methodList.map((item) => (
          <li className='method__listItem'>
            <h2>0{item.index}</h2>
            <p>{item.step}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Methods;