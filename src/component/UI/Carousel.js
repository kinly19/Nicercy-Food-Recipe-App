import { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./Carousel.scss";

const Carousel = (props) => {
  // States
  const [slideIndex, setSlideIndex] = useState(0);
  const [length, setLength] = useState(props.children.length);
  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  // Change amount of slides to show
  let show = 5;
  if (viewPortWidth <= 1900) {
    show = 4;
  }

  if (viewPortWidth <= 1400) {
    show = 3;
  }

  if (viewPortWidth <= 900) {
    show = 2;
  }

  if (viewPortWidth <= 500) {
    show = 1;
  }

  // Styling
  const translateStyle = {
    transform: `translateX(-${slideIndex * (100 / show)}%)`,
  };

  // Handlers
  const nextSlideHandler = () => {
    if (slideIndex < length - show) {
      setSlideIndex((prevState) => prevState + 1);
    }
  };

  const prevSlideHandler = () => {
    if (slideIndex > 0) {
      setSlideIndex((prevState) => prevState - 1);
    }
  };

  const resizeHandler = () => {
    setViewPortWidth(window.innerWidth);
  };

  const debounceHandler = (func, delay) => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  // Side Effects
  useEffect(() => {

    setLength(props.children.length);
    const debounceResize = debounceHandler(resizeHandler, 200);
    window.addEventListener("resize", debounceResize);

    return () => {
      window.addEventListener("resize", debounceResize);
    };
  }, [props.children]);

  return (
    <div className="carousel">
      <div className="carousel__content-wrapper">
        <ul className={`carousel__content show-${show}`} style={translateStyle}>
          {props.children}
        </ul>
      </div>
      <button className="carousel__prevBtn" onClick={prevSlideHandler}>
        <FiChevronLeft className="carousel__icon" />
      </button>
      <button className="carousel__nextBtn" onClick={nextSlideHandler}>
        <FiChevronRight className="carousel__icon" />
      </button>
    </div>
  );
};

export default Carousel;