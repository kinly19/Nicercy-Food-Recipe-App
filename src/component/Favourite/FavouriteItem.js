import { MdDeleteForever } from "react-icons/md";
import "./FavouriteItem.scss";

const FavouriteItem = (props) => {
  return (
    <li className="listItem">
      <div className="listItem__content" onClick={props.onNavigate}>
        <p>{props.title}</p>
      </div>
      <div className="listItem__action">
        <button onClick={props.onRemove}>
          <MdDeleteForever className="listItem__icon" />
        </button>
      </div>
    </li>
  );
};

export default FavouriteItem;