import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faFacebook,
  faTelegram,
  faGithub,
  faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Foooter() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row footer-wrap align-items-center">
            {/*<div className="col-md-7">*/}
            <div className="col-md-12">
              <p className="cpoyright-text">
                &copy;{new Date().getFullYear()}{" "}
                <a href="https://storx.tech" target="_blank">
                  StorX
                </a>
                . All Rights Reserved. <Link to="/disclaimer">Disclaimer</Link>
              </p>
              {/*<p>
                <Link to="/disclaimer">Disclaimer</Link>
              </p>*/}
            </div>
            <div className="col-md-5 d-none">
              <div className="privacy-terms">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <a href="https://twitter.com/StorXNetwork" target="_blank">
                      <FontAwesomeIcon size="lg" icon={faTwitter} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/company/storxnetwork"
                      target="_blank"
                    >
                      <FontAwesomeIcon size="lg" icon={faLinkedin} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.facebook.com/StorXNetwork"
                      target="_blank"
                    >
                      <FontAwesomeIcon size="lg" icon={faFacebook} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://t.me/StorXNetwork" target="_blank">
                      <FontAwesomeIcon size="lg" icon={faTelegram} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://github.com/StorXNetwork" target="_blank">
                      <FontAwesomeIcon size="lg" icon={faGithub} />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.reddit.com/r/StorXNetwork"
                      target="_blank"
                    >
                      <FontAwesomeIcon size="lg" icon={faReddit} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="back-to-top" id="back-to-top">
        <FontAwesomeIcon size="xs" icon={faArrowUp} />
      </a>
    </>
  );
}

export default React.memo(Foooter);
