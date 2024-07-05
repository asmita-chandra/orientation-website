import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';

import ProfileIcon from '../../assets/navbar/circle-user-solid-purple.svg';
import HomeIconPurple from '../../assets/navbar/house-solid-purple.svg';
import AboutIconPurple from '../../assets/navbar/circle-info-solid-purple.svg';
import MessageIconPurple from '../../assets/navbar/message-solid-purple.svg';
import HomeIconGrey from '../../assets/navbar/house-solid-grey.svg';
import AboutIconGrey from '../../assets/navbar/circle-info-solid-grey.svg';
import MessageIconGrey from '../../assets/navbar/message-solid-grey.svg';
import MainFroshLogo from '../../assets/logo/main-logo.png';

const pages = {
  main: [
    {
      label: 'Home',
    },
    {
      label: 'About',
    },
    {
      label: 'FAQ',
    },
  ],
  special: [
    {
      label: 'Login',
    },
    {
      label: 'Register',
    },
    {
      label: 'Profile',
    },
  ],
};

const NavbarStorybook = ({ selectedPage, isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <>
      <div className="navbar-desktop">
        <NavbarDesktop
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarDesktop>
      </div>
      <div className="navbar-mobile">
        <NavbarMobile
          selectedPage={selectedPage}
          isLoggedIn={isLoggedIn}
          froshInitials={froshInitials}
          isRegistered={isRegistered}
        ></NavbarMobile>
      </div>
    </>
  );
};

const NavbarDesktop = ({ selectedPage, isLoggedIn, froshInitials, isRegistered }) => {
  return (
    <div className="navbar-container">
      <div className="navbar-main">
        <img className="icon-logo" src={MainFroshLogo}></img>
        {/* MAIN PAGES - Home, About, FAQ */}
        {pages.main.map((page) => {
          return (
            <li key={page.label}>
              <div className="navbar-sub-container">
                <div className="navbar-link"> {page.label} </div>
                {/* <div className="underline"></div> */}
                <div
                  className={`navbar-underline ${
                    selectedPage === page.label ? 'underline-selected' : ''
                  }`}
                ></div>
              </div>
            </li>
          );
        })}
      </div>

      <div className="navbar-special">
        {/* SPECIAL PAGES - Profile, Register, Login*/}
        {pages.special.map((page) => {
          // Clicking on profile button
          if (page.label === 'Profile') {
            if (isLoggedIn) {
              // if logged in
              return (
                <>
                  <div className="frosh-profile">F!rosh Profile</div>
                  <div className="icon-profile"> {froshInitials} </div>
                </>
              );
            }
            // if not logged in
            return <img className="icon-profile-person" alt="profile" src={ProfileIcon}></img>;
          } // Clicking on register button
          else if (page.label === 'Register' && isLoggedIn && !isRegistered) {
            // if not logged in
            return <div className="register">{page.label}</div>;
          } // Clicking on login button
          else if (page.label === 'Login' && !isLoggedIn) {
            return <div className="login">{page.label}</div>;
          }
        })}
      </div>
    </div>
  );
};

const NavbarMobile = ({ selectedPage, isLoggedIn, froshInitials }) => {
  return (
    <div className="navbar-container">
      <img className="icon-logo" src={MainFroshLogo}></img>

      <div className="navbar-main">
        {/* MAIN PAGES - Home, About, FAQ */}

        {pages.main.map((page) => {
          if (page.label === 'Home') {
            return (
              <div className="navbar-sub-container">
                <div className="menu-icon">
                  <img
                    className="svg-icon"
                    alt="home"
                    src={selectedPage === page.label ? HomeIconPurple : HomeIconGrey}
                  ></img>
                </div>
                <div
                  className={`navbar-underline ${
                    selectedPage === page.label ? 'underline-selected' : ''
                  }`}
                ></div>
              </div>
            );
          } else if (page.label === 'About') {
            return (
              <div className="navbar-sub-container">
                <div className="menu-icon">
                  <img
                    className={`svg-icon ${selectedPage === page.label ? 'svg-icon-selected' : ''}`}
                    alt="about"
                    src={selectedPage === page.label ? AboutIconPurple : AboutIconGrey}
                  ></img>
                </div>
                <div
                  className={`navbar-underline ${
                    selectedPage === page.label ? 'underline-selected' : ''
                  }`}
                ></div>
              </div>
            );
          } else if (page.label === 'FAQ') {
            return (
              <div className="navbar-sub-container">
                <div className="menu-icon">
                  <img
                    className={`svg-icon ${selectedPage === page.label ? 'svg-icon-selected' : ''}`}
                    alt="faq"
                    src={selectedPage === page.label ? MessageIconPurple : MessageIconGrey}
                  ></img>
                </div>
                <div
                  className={`navbar-underline ${
                    selectedPage === page.label ? 'underline-selected' : ''
                  }`}
                ></div>
              </div>
            );
          }
        })}
      </div>

      {pages.special.map((page) => {
        if (page.label === 'Login') {
          if (!isLoggedIn) {
            return <div className="login">{page.label}</div>;
          } else if (isLoggedIn) {
            return (
              // mobile: profile icon -> link to frosh profile
              <div className="icon-profile"> {froshInitials} </div>
            );
          }
        }
      })}
    </div>
  );
};

const propTypes = {
  // the page the user is on
  selectedPage: PropTypes.string,

  // button appears if frosh is logged in
  isLoggedIn: PropTypes.bool,

  // frosh initials used for profile
  froshInitials: PropTypes.string,

  // register button disappears if frosh is already registered
  isRegistered: PropTypes.bool,
};

NavbarStorybook.propTypes = propTypes;
NavbarDesktop.propTypes = propTypes;
NavbarMobile.propTypes = propTypes;

export { NavbarStorybook, NavbarDesktop, NavbarMobile };
