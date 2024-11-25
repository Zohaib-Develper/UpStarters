import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname.includes("signup") || pathname.includes("login")) return "";

  return (
    <footer class="footer-container">
      <div class="footer-top">
        <nav class="footer-nav">
          <ul>
            <li>
              <a href="#">Arts</a>
            </li>
            <li>
              <a href="#">Comics & Illustration</a>
            </li>
            <li>
              <a href="#">Design & Tech</a>
            </li>
            <li>
              <a href="#">Film</a>
            </li>
            <li>
              <a href="#">Food & Craft</a>
            </li>
            <li>
              <a href="#">Games</a>
            </li>
            <li>
              <a href="#">Music</a>
            </li>
            <li>
              <a href="#">Publishing</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer-middle">
        <div class="footer-column">
          <h4>About</h4>
          <ul>
            <li>
              <a href="#">Mamoon Ahmad</a>
            </li>
            <li>
              <a href="#">Zohaib Musharaf</a>
            </li>
            <li>
              <a href="#">Abdul Rafay</a>
            </li>
            <li>
              <a href="#">Chand Ali</a>
            </li>
            <li>
              <a href="#">Areeb Asif</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">Donate Us</a>
            </li>
            <li>
              <a href="#">Our Rules</a>
            </li>
            <li>
              <a href="#">Creator Handbook</a>
            </li>
            <li>
              <a href="#">Patrons</a>
            </li>
            <li>
              <a href="#">Brand assets</a>
            </li>
          </ul>
        </div>
        <div class="footer-logo">
          <p>© Upstarter, 2024</p>
          <div class="social-icons">
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <ul>
          <li>
            <a href="#">Trust & Safety</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Cookie Policy</a>
          </li>
          <li>
            <a href="#">Accessibility Statement</a>
          </li>
          <li>
            <a href="#">CA Notice of Consent</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
