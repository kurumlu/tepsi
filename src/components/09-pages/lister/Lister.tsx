import * as React from 'react';
import { FunctionComponent } from 'react';

const Lister: FunctionComponent = () => {
  return (
    <div id="body-wrapper" className="wrapper">
      <div className="navigation-horizontal"></div>
      <div className="main-content__container clear"></div>
      <footer className="footer__container"></footer>
    </div>
  );
};

export const ListerPage = Lister;
