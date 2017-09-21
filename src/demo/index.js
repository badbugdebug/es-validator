/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 8. 22.
 */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import ReactDOM from 'react-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import FormValidContainer from './FormValidContainer';


ReactDOM.render(
  <FormValidContainer />,
  document.getElementById('app'),
);
