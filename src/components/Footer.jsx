import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">🌍</span>
              <span className="footer__logo-text">MigrateAI</span>
            </div>
            <p className="footer__description">
              Empowering migrants and travelers with AI-powered guidance, tools, and community stories to make every journey seamless.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Platform</h4>
            <Link to="/journey" className="footer__link">Start Journey</Link>
            <Link to="/compare" className="footer__link">Compare Countries</Link>
            <Link to="/map" className="footer__link">Explore Map</Link>
            <Link to="/stories" className="footer__link">Read Stories</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Tools</h4>
            <Link to="/tools" className="footer__link">Visa Checker</Link>
            <Link to="/tools" className="footer__link">Cost Calculator</Link>
            <Link to="/tools" className="footer__link">Budget Estimator</Link>
            <Link to="/tools" className="footer__link">Currency Converter</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Resources</h4>
            <Link to="/analytics" className="footer__link">Analytics</Link>
            <Link to="/stories" className="footer__link">Community</Link>
            <a href="#" className="footer__link">Help Center</a>
            <a href="#" className="footer__link">Contact Us</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 MigrateAI. Built with ❤️ for migrants worldwide.
          </p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
