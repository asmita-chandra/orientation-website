import React, { useEffect, useState } from 'react';

// F!rosh 2T3 Landing Pages
import { TanuLanding } from './TanuLanding/TanuLanding';
import { UzmaLanding } from './UzmaLanding/UzmaLanding';
import { NatLanding } from './NatLanding/NatLanding';
import { SherryLanding } from './SherryLanding/SherryLanding';

// F!rosh 2T4 Landing Pages
import { AshLanding } from './AshLanding/AshLanding';

const currentYear = '2T4';

const landingPages = [
  {
    key: 0,
    component: <TanuLanding />,
    year: '2T3',
  },
  {
    key: 1,
    component: <UzmaLanding />,
    year: '2T3',
  },
  {
    key: 2,
    component: <NatLanding />,
    year: '2T3',
  },
  {
    key: 3,
    component: <SherryLanding />,
    year: '2T3',
  },
  {
    key: 4,
    component: <AshLanding />,
    year: '2T4',
  },
];

// Change this logic to determine which landing pages to show
const landingPagesFiltered = landingPages.filter((page) => page.year === currentYear);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const LandingPage = () => {
  const [pageIndex, setPageIndex] = useState(null);
  useEffect(() => {
    if (landingPagesFiltered.length !== 1) {
      let randIdx = randomNumber(0, landingPagesFiltered.length - 1);
      const localIdx = window.localStorage.getItem('landing_page_idx');

      if (localIdx !== null) {
        while (randIdx === JSON.parse(localIdx)) {
          randIdx = randomNumber(0, landingPagesFiltered.length - 1);
        }
      }
      window.localStorage.setItem('landing_page_idx', JSON.stringify(randIdx));
      setPageIndex(JSON.parse(randIdx));
    }
  }, []);

  return (
    <>
      {landingPagesFiltered.length === 1
        ? landingPagesFiltered[0].component
        : landingPagesFiltered.map((item) => {
            if (item.key === pageIndex) {
              return <div key={item.key}>{item.component}</div>;
            }
            return null;
          })}
    </>
  );
};
