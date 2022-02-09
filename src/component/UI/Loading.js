import './Loading.scss';

const Loading = (props) => {
  return (
    <div className='loading' style={{alignItems : `${props.align}`}}>
      <h1>Nicercy please wait...</h1>
      <div className='loading__spanContainer'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
    </div>
  );
};

export default Loading;