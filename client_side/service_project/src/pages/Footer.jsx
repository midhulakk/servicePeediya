import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-success">About Us</h5>
            <p>
              We are a leading company providing exceptional services to our
              clients. Our goal is to offer top-notch solutions tailored to your
              needs.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="text-success">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/aboutus" className="text-white">About Us</a></li>
              <li><a href="/feedback" className="text-white">feedback</a></li>
              <li><a href="/contactUs" className="text-white">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5 className="text-success">Follow Us</h5>
            <div className="d-flex">
              {/* Facebook Icon */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
              >
                <i className="fab fa-facebook-f" style={{ fontSize: "30px" }}></i>
              </a>

              {/* Twitter Icon */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
              >
                <i className="fab fa-twitter" style={{ fontSize: "30px" }}></i>
              </a>

              {/* Instagram Icon */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
              >
                <i className="fab fa-instagram" style={{ fontSize: "30px" }}></i>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-3"
              >
                <i className="fab fa-linkedin-in" style={{ fontSize: "30px" }}></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">© 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
