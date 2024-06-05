import React, { useEffect, useState } from 'react';

// F!rosh 2T3 Landing Pages
import { TanuLanding } from './TanuLanding/TanuLanding';
import { UzmaLanding } from './UzmaLanding/UzmaLanding';
import { NatLanding } from './NatLanding/NatLanding';
import { SherryLanding } from './SherryLanding/SherryLanding';

// F!rosh 2T4 Landing Pages
import { AshLanding } from './AshLanding/AshLanding';
import { WilliamLanding } from './WilliamLanding/WilliamLanding';

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
    key: 0,
    component: <AshLanding />,
    year: '2T4',
  },
  {
    key: 1,
    component: <WilliamLanding />,
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
    console.log('Component mounted');
    console.log('Landing pages filtered:', landingPagesFiltered);

    if (landingPagesFiltered.length !== 1) {
      let randIdx = randomNumber(0, landingPagesFiltered.length - 1);
      console.log('Initial random index:', randIdx);

      const localIdx = window.localStorage.getItem('landing_page_idx');
      console.log('Local storage index:', localIdx);

      if (localIdx !== null) {
        while (randIdx === JSON.parse(localIdx)) {
          console.log('Random index equals local storage index, generating new random index');
          randIdx = randomNumber(0, landingPagesFiltered.length - 1);
          console.log('New random index:', randIdx);
        }
      }

      window.localStorage.setItem('landing_page_idx', JSON.stringify(randIdx));
      console.log('Setting pageIndex to:', randIdx);
      setPageIndex(randIdx);
    } else {
      console.log('Only one landing page available, no need to generate random index');
    }
  }, []);

  useEffect(() => {
    console.log('pageIndex updated:', pageIndex);
  }, [pageIndex]);

  console.log('Current pageIndex:', pageIndex);

  return (
    <>
      {landingPagesFiltered.length === 1
        ? landingPagesFiltered[0].component
        : landingPagesFiltered.map((item) => {
            if (item.key === pageIndex) {
              console.log('Rendering landing page with key:', item.key);
              return <div key={item.key}>{item.component}</div>;
            }
            return null;
          })}
    </>
  );
};
