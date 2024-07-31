import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import waveBottom from '../../../assets/misc/wave-reverse.png';
import waveBottomDarkMode from '../../../assets/darkmode/misc/wave-reverse.png';
import { DarkModeContext } from '../../../util/DarkModeProvider';

const Header = ({ text, children, underlineDesktop, underlineMobile }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  return (
    <>
      <div className="header-page-container">
        <div className="header-page-subcontainer">
          <h2 className="header-page-title">{text.toUpperCase()}</h2>
          <div
            className="header-page-title-underline display-only-desktop"
            style={{ width: underlineDesktop }}
          ></div>
          <div
            className="header-page-title-underline display-only-tablet"
            style={{ width: underlineMobile }}
          ></div>
          {children}
        </div>
        {darkMode ? (
          <img className="header-page-wave-bottom" src={waveBottomDarkMode} alt="wave"></img>
        ) : (
          <img className="header-page-wave-bottom" src={waveBottom} alt="wave"></img>
        )}
      </div>
    </>
  );
};

Header.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  underlineDesktop: PropTypes.string,
  underlineMobile: PropTypes.string,
};

export { Header };
