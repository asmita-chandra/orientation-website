import React from 'react';
import PropTypes from 'prop-types';
import './AsmitaLanding.scss';
import InstagramIcon from '../../../assets/social/instagram-brands-dark-purple.svg';

const InstagramButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="no-link-style">
      <div className="button">
        <img src={InstagramIcon} alt="Instagram Icon" className="button-icon" />
        <span className="button-text">{text}</span>
      </div>
    </a>
  );
};

InstagramButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const AsmitaLanding = () => {
  return (
    <>
      <div className="initial-page">
        <div className="container">
          <div className="title">
            <h1 className="title-text">COMING SOON</h1>
            <hr className="line"></hr>
            <p className="subtitle">
              Hey F!rosh! Our magical portal is currently being enchanted. Check back soon to
              witness the wonders we’re creating!
            </p>
          </div>

          <div className="info">
            <div className="button-container">
              <InstagramButton
                link="https://www.instagram.com/froshweek/"
                text="follow @froshweek to get updates"
              />
              <InstagramButton
                link="https://www.instagram.com/froshnomore/"
                text="follow @froshnomore to get involved"
              />
            </div>
          </div>

          <div className="footer">
            <h2 className="footer-text">Made with 💜 by the F!rosh Week 2T4 Tech Team</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { AsmitaLanding };
