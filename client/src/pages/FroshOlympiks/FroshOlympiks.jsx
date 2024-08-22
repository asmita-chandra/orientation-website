import React, { useState, useEffect, useContext } from 'react';
import './FroshOlympiks.scss';
import { Link, useNavigate } from 'react-router-dom';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useSelector } from 'react-redux';
import { ScheduleComponent } from '../../components/schedule/ScheduleOlympiks/ScheduleOlympiks';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export const FroshOlympiks = () => {
  const navigate = useNavigate();
  const isRegistered = useSelector(registeredSelector);

  useEffect(() => {
    if (!isRegistered) {
      navigate('/profile');
    }
  }, [isRegistered]);

  return (
    <>
      <OlympiksSchedule />
    </>
  );
};

const OlympiksSchedule = () => {
  return (
    <>
      <div className="home-page-schedule">
        <h2 className="home-page-section-header">DISCIPLINE</h2>
        <ScheduleComponent />
      </div>
      <img
        src="/src/assets/misc/wave-reverse.png"
        className="wave-image home-page-bottom-wave-image"
        alt="wave-img"
      ></img>
    </>
  );
};
