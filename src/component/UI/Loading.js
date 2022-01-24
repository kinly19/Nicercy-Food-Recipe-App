import './Loading.scss';

const Loading = () => {
  return (
    <div className='loading'>
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