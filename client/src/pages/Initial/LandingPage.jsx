import React, { useEffect, useState } from 'react';

// Frosh No More Landing Pages
import { AshLanding } from './AshLanding/AshLanding';
import { WilliamLanding } from './WilliamLanding/WilliamLanding';

const landingPages = [
  {
    key: 1,
    component: <AshLanding />,
  },
  {
    key: 0,
    component: <WilliamLanding />,
  },
];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const LandingPage = () => {
  const [pageIndex, setPageIndex] = useState(null);

  useEffect(() => {
    let randIdx = randomNumber(0, landingPages.length - 1);
    const localIdx = window.localStorage.getItem('landing_page_idx');

    console.log('Initial random index:', randIdx);
    console.log('Local storage index:', localIdx);

    if (localIdx !== null) {
      const parsedLocalIdx = JSON.parse(localIdx);
      while (randIdx === parsedLocalIdx) {
        randIdx = randomNumber(0, landingPages.length - 1);
      }
      console.log('New random index after avoiding local storage index:', randIdx);
    }

    window.localStorage.setItem('landing_page_idx', JSON.stringify(randIdx));
    setPageIndex(randIdx);
  }, []);

  return (
    <>
      {landingPages.map((item) => {
        if (item.key === pageIndex) {
          console.log('Rendering landing page with key:', item.key);
          return <div key={item.key}>{item.component}</div>;
        }
        return null;
      })}
    </>
  );
};
