import React, { useState, useEffect, useContext } from 'react';
import { getSlideshowImages, getTimelineEvents } from './functions';
import './Home.scss';
import Wave from '../../assets/misc/wave.png';
import WaveReverse from '../../assets/misc/wave-reverse.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave.png';
import WaveReverseDarkmode from '../../assets/darkmode/misc/wave-reverse.png';
import { Button } from '../../components/button/Button/Button';
import { Link } from 'react-router-dom';

import { Timeline } from '../../components/timeline/Timeline/Timeline';
import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import MainFroshLogo from '../../assets/logo/main-logo.png';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { ScheduleComponent } from '../../components/schedule/ScheduleHome/ScheduleHome';
import { PopupModal } from '../../components/popup/PopupModal';
import { sponsors } from '../../util/sponsors';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { useSelector } from 'react-redux';
import { loggedInSelector, userSelector } from '../../state/user/userSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Header } from '../../components/text/Header/Header';
import { otherEventsData } from './otherevents';

import ProgressiveImage from '../../components/progressiveImg/ProgressiveImg';
import blackstudentorientationlogo from '../../assets/misc/blackstudentorientationlogo.png';
import facultylogo from '../../assets/misc/facultylogo.png';

const PageHome = () => {
  return (
    <>
      <HomePageHeader />
      <HomePageTimeline />
      <HomePageSchedule />
      <PageAbout />
      {/* <HomePageBlackStudentOrientation /> */}
      <HomePageSponsors />
    </>
  );
};

const HomePageHeader = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="home-page-header">
      <LazyLoadImage
        src={MainFroshLogo}
        className="FroshHardHatWhite-logo"
        alt="home page frosh logo"
        effect="blur"
      ></LazyLoadImage>
      <div className="home-page-header-text">
        <h2>WELCOME TO F!ROSH WEEK!</h2>
        <p>Organized by the University of Toronto Engineering Society Orientation Commitee</p>
        <HomeHeaderButton />
      </div>
      <div className="home-page-landing-image-container">
        <HomePageSlideshow />
      </div>
      {darkMode ? (
        <img src={WaveDarkMode} className="wave-image home-page-top-wave-image" alt="wave-img" />
      ) : (
        <img src={Wave} className="wave-image home-page-top-wave-image" alt="wave-img" />
      )}
    </div>
  );
};

const HomeHeaderButton = () => {
  const loggedIn = useSelector(loggedInSelector);

  return (
    <>
      <Link
        key={loggedIn ? '/profile' : '/sign-up'}
        to={loggedIn ? '/profile' : '/sign-up'}
        style={{ textDecoration: 'none' }}
        className="no-link-style"
      >
        <div className="home-page-header-register-button">
          <div className="desktop-only">
            <Button
              label={loggedIn ? 'View Profile' : 'Register Now!'}
              isSecondary
              style={{
                margin: '0px',
                height: '100%',
                fontSize: 'unset',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // hidden button xD
              // style={{
              // width: '0.px',
              // height: '0.px',
              // fontSize: '0px',
              // opacity: '0',
              // }}
            />
          </div>
          <div className="mobile-only">
            <Button
              label={loggedIn ? 'View Profile' : 'Register Now!'}
              isSecondary
              style={{ margin: '0px' }}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

const HomePageSlideshow = () => {
  const properties = {
    duration: 8000,
    autoplay: true,
    transitionDuration: 1000,
    arrows: false,
    infinite: true,
    easing: 'cubic',
  };
  return (
    <Slide {...properties}>
      {getSlideshowImages().map((image, index) => (
        <div key={index} style={{ overflow: 'hidden' }}>
          <ProgressiveImage
            classStyle="home-page-landing-image"
            src={image.src}
            placeholder={image.placeholder}
            alt={'slideshow' + index}
            loading="lazy"
          />
        </div>
      ))}
    </Slide>
  );
};

const HomePageTimeline = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [dates, setDates] = useState();
  const datesSetter = async () => {
    setDates(await getTimelineEvents());
  };
  useEffect(() => {
    datesSetter();
  }, []);

  return (
    !(dates === undefined || dates?.length === 0) && (
      <div className="home-page-timeline">
        <h2 className="home-page-section-header">TIMELINE</h2>
        <Timeline
          dates={dates}
          onClick={(date) => {
            setShowPopUp(true);
            setSelectedEvent(date);
          }}
        />

        <PopupModal
          trigger={showPopUp}
          setTrigger={setShowPopUp}
          blurBackground={false}
          exitIcon={true}
        >
          <div className="home-page-timeline-popup-container">
            <h1>{selectedEvent.eventName}</h1>
            <p>{selectedEvent.description}</p>

            {selectedEvent.link !== '' ? (
              <div className="home-page-timeline-popup-button">
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  className="no-link-style"
                  rel="noreferrer"
                >
                  <Button
                    label={selectedEvent.linkLabel}
                    isSecondary
                    style={{ margin: 0, float: 'right' }}
                  ></Button>
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </PopupModal>
      </div>
    )
  );
};

const HomePageSchedule = () => {
  const loggedIn = useSelector(loggedInSelector);
  return (
    <div className="home-page-schedule">
      <h2 className="home-page-section-header">SCHEDULE{loggedIn ? '*' : ''}</h2>
      {loggedIn ? (
        <div className="home-page-schedule-warning">
          *Different Frosh groups have different schedules. The homepage schedule is the basic
          schedule. To see yours, visit the <Link to={'/profile'}>Profile</Link> page.
        </div>
      ) : (
        <></>
      )}
      <ScheduleComponent />
    </div>
  );
};

const PageAbout = () => {
  return (
    <>
      <div className="aboutus-page-components">
        <AboutUsSection />
        {/* <AboutUsTeamsTabWrapper /> */}
      </div>
    </>
  );
};

const AboutUsSection = () => {
  return (
    <div id="other-events">
      <Header text="OTHER EVENTS">
        <>
          {otherEventsData.map((info, index) => {
            return (
              <div className="otherevents-subsubcontainer" key={info.title}>
                <div className="otherevents-image-container">
                  <LazyLoadImage
                    className="otherevents-image"
                    src={index === 0 ? blackstudentorientationlogo : facultylogo}
                    alt={info.title}
                  ></LazyLoadImage>
                </div>
                <div className="otherevents-info-container" key={info.title}>
                  <div className="otherevents-info">
                    <h2 className="otherevents-info-title">{info.title}</h2>
                    <p
                      className="otherevents-info-des"
                      dangerouslySetInnerHTML={{ __html: info.description }}
                    ></p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </Header>
    </div>
  );
};

const HomePageSponsors = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="home-page-sponsors">
      <h2>OUR SPONSORS</h2>
      <PleaseSponsor />

      {sponsors.length > 0 && (
        <div>
          {viewAll === false ? (
            <ImageCarousel items={sponsors} />
          ) : (
            <div className="all-sponsors-area">
              {sponsors.map((item, index) => {
                return (
                  <div key={item.name + index} className="sponsor-container">
                    <a
                      href={item.website}
                      key={item.name + index}
                      target="_blank"
                      rel="noreferrer"
                      className="no-link-style"
                    >
                      <LazyLoadImage alt={item.name} effect="blur" src={item.image}></LazyLoadImage>
                    </a>
                    <p>{item.label}</p>
                  </div>
                );
              })}
            </div>
          )}
          {!viewAll ? (
            <Button
              label={'View All'}
              onClick={() => {
                setViewAll(true);
              }}
            />
          ) : (
            <Button
              label={'View Less'}
              onClick={() => {
                setViewAll(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const PleaseSponsor = () => {
  return (
    <div className="please-sponsor">
      <h3>WANT TO SPONSOR F!ROSH WEEK?</h3>
      <h4>PLEASE CONTACT:</h4>
      <a href="mailto:sponsorship@orientation.skule.ca">sponsorship@orientation.skule.ca</a>
    </div>
  );
};

export { PageHome };
