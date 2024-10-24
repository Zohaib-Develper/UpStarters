import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname.includes("signup") || pathname.includes("login")) return "";

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Upstarter</h5>
            <p>
              Upstarter is a platform for creators and investors to connect and
              bring amazing projects to life. Join us to support your favorite
              projects and make a difference.
            </p>
            <a href="#" className="btn btn-success">
              Donate Us
            </a>
          </div>
          <div className="col-md-4">
            <h5>About Developers</h5>
            <ul className="footer-links">
              <li>
                <a href="#">Zohaib Musharaf (Team Lead :) )</a>
              </li>
              <li>
                <a href="#">Abdul Rafay</a>
              </li>
              <li>
                <a href="#">Chand Ali</a>
              </li>

              <li>
                <a href="#">Mamoon Ahmad</a>
              </li>
              <li>
                <a href="#">Areeb Asif</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="socials">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-github"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; 2024 Upstarter. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
