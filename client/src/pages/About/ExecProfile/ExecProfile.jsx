import React from 'react';
import PropTypes from 'prop-types';
import './ExecProfile.scss';

import wave from '../../../assets/about/wave-about.svg';
import { useState } from 'react';

const ExecProfile = ({ image, name, role, discipline, roleDescription, favPart, exec, quote }) => {
  // initialize to false, don't show description
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="exec-container" onClick={() => setShowDescription(!showDescription)}>
      <img src={image} className="exec-image"></img>
      <div
        className={` ${
          showDescription ? 'exec-profile-description-show' : 'exec-profile-description-hide'
        }`}
      >
        {exec ? (
          <ExecProfileDescription
            name={name}
            role={role}
            discipline={discipline}
            roleDescription={roleDescription}
            favPart={favPart}
          />
        ) : (
          <NonexecProfileDescription name={name} discipline={discipline} quote={quote} />
        )}
      </div>
    </div>
  );
};

const ExecProfileTitle = ({ name, role }) => {
  return (
    <>
      <img src={wave} className="wave-profile"></img>
      <div className="exec-profile-title-cont">
        <p className="exec-profile-position">{role.toUpperCase()}</p>
        <h3 className="exec-profile-name">{name}</h3>
      </div>
    </>
  );
};

const ExecProfileDescription = ({ name, role, discipline, roleDescription, favPart }) => {
  return (
    <div className="exec-profile-description">
      <div className="exec-profile-title-cont">
        <p className="exec-profile-position">{role.toUpperCase()}</p>
        <h3 className="exec-profile-name">{name}</h3>
      </div>

      <p className="exec-profile-description-dis">
        <span style={{ fontWeight: 'bold' }}>DISCIPLINE: </span>
        {discipline}
      </p>

      <p className="exec-profile-description-role">
        <span style={{ fontWeight: 'bold' }}>MY ROLE: </span>
        <br></br>
        {roleDescription}
      </p>

      <p className="exec-profile-description-fav">
        <span style={{ fontWeight: 'bold' }}>MY FAVOURITE PART: </span>
        <br></br>
        {favPart}
      </p>
    </div>
  );
};

const NonexecProfileDescription = ({ name, discipline, quote }) => {
  return (
    <div className={`exec-profile-description ${'nonexec-profile-description'}`}>
      <div className="exec-profile-title-cont">
        <h3 className="exec-profile-name">{name}</h3>
      </div>

      <p className="exec-profile-description-dis">
        <span style={{ fontWeight: 'bold' }}>DISCIPLINE: </span>
        {discipline}
      </p>

      <p className="exec-profile-description-role">{quote}</p>
    </div>
  );
};

NonexecProfileDescription.propTypes = {
  name: PropTypes.string,
  discipline: PropTypes.string,
  quote: PropTypes.string,
};

ExecProfile.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string, // use this for the name e.g. import "NAME" ?

  discipline: PropTypes.string,
  roleDescription: PropTypes.string,
  favPart: PropTypes.string,
  quote: PropTypes.string,

  exec: PropTypes.bool, // if true display bio for exec, if false, display bio for nonexec
};

ExecProfileTitle.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
};

ExecProfileDescription.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  discipline: PropTypes.string,
  roleDescription: PropTypes.string,
  favPart: PropTypes.string,
};

ExecProfileTitle.defaultProps = {
  role: 'role',
  name: 'First Last Name',
};

ExecProfile.defaultProps = {
  role: 'role',
  name: 'First Last Name',
};

export { ExecProfile };
