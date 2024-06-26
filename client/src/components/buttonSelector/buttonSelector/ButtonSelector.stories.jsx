import { React, useState } from 'react';

import { ButtonSelector } from './ButtonSelector';

export default {
  title: 'ButtonSelector',
  component: ButtonSelector,
};

export const firstButtonActive = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [{ name: 'MONDAY' }, { name: 'TUESDAY' }, { name: 'WEDNESDAY' }];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};

export const secondButtonActive = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const data = [{ name: 'MONDAY' }, { name: 'TUESDAY' }, { name: 'WEDNESDAY' }];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};

export const colouredButtons = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const data = [
    { name: 'MONDAY', buttonColor: 'red' },
    { name: 'TUESDAY', buttonColor: 'green' },
    { name: 'WEDNESDAY', buttonColor: 'blue' },
  ];

  return (
    <div>
      <ButtonSelector
        buttonList={data}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      ></ButtonSelector>
    </div>
  );
};
