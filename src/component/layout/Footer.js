import { Link } from 'react-router-dom';
import './Footer.scss';
import spoonLogo from '../../assets/spoonLogo.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Link to={"/"} className="footer__title">Nicercy</Link>
        <div className="footer__linkBack">
          <img src={spoonLogo} alt="Spoonacular logo" />
          <a href="https://spoonacular.com/food-api/apps" target="_blank">Powered By Spoonacular API</a>
        </div>
        <p>Made with ♥ K.LY Code</p>
      </div>
    </footer>
  );
}

export default Footer;