import React from 'react';
import IntroInspiration from '../composants/InspirationConseil/IntroInspirationConseil';
import StyleGrid from '../composants/InspirationConseil/StyleGrid';
import ConseilsDeco from '../composants/InspirationConseil/ConseilsDeco';

export default function InspirationConseil() {
  return (
    <div className="page-inspiration">
      <IntroInspiration />
      <StyleGrid />
      <ConseilsDeco />
    </div>
  );
}