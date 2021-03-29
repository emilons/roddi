/*
 *  CASER Å TESTE I DENNE KOMPONENTEN
 * 1) Riktige knapper vises logget inn/ikke logget inn/admin/ikke admin/page
 * 2) rendrer riktig
 * 3) redirects funker
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header.js';
import App from '../../App';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('Renders Header', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header></Header>, div);
});

it('Header renders logo correctly', () => {
  const RenderResult = render(<Header />);
  expect(screen.getByAltText('logoen')).toBeInTheDocument();
});

it('Renders correct buttons when logged in', () => {
  localStorage.setItem('token', 'test');
  localStorage.setItem('isAdmin', 'false');
  const header = render(<Header />);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger').length
  ).toEqual(2);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[0]
      .firstElementChild.innerHTML
  ).toEqual('Hjem');
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[1]
      .innerHTML
  ).toEqual('Logg Ut');
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
});

it('Renders correct buttons when admin is logged in', () => {
  localStorage.setItem('token', 'test');
  localStorage.setItem('isAdmin', 'true');
  const header = render(<Header />);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger').length
  ).toEqual(3);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[0]
      .firstElementChild.innerHTML
  ).toEqual('Hjem');
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[1]
      .firstElementChild.innerHTML
  ).toEqual('Statistikk');
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[2]
      .innerHTML
  ).toEqual('Logg Ut');
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
});

it('Renders correct buttons when logged out', () => {
  const header = render(<Header />);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger').length
  ).toEqual(2);
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[0]
      .firstElementChild.innerHTML
  ).toEqual('Registrer deg');
  expect(
    header.container.getElementsByClassName('btn btn-outline-danger')[1]
      .firstElementChild.innerHTML
  ).toEqual('Logg Inn');
});

it('tests that buttons work properly for admin', () => {
  localStorage.setItem('token', 'test');
  localStorage.setItem('isAdmin', 'true');
  const header = render(<App />);
  expect(header.findByText('Hjem'));
  const buttonHome = header.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[0].firstElementChild;
  buttonHome.click();
  expect(header.findByText('Opprett dødsbo'));
  const buttonStats = header.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[1].firstElementChild;
  buttonStats.click();
  expect(header.findByText('Statistikk for Røddi'));
  const buttonLogOut = header.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[2];
  buttonLogOut.click();
  expect(!localStorage.getItem('token'));
});
/*
it('tests that buttons work properly for user', () => {
    localStorage.setItem('token', 'test');
    localStorage.setItem('isAdmin', 'false');
    const header = render(<App />);
    expect(header.findByText('Hjem'));
    const buttonHome = header.container.getElementsByClassName(
      'btn btn-outline-danger'
    )[0].firstElementChild;
    buttonHome.click();
    expect(header.findByText('Dine dødsbo'));
    const buttonLogOut = header.container.getElementsByClassName(
      'btn btn-outline-danger'
    )[1];
    buttonLogOut.click();
    expect(!localStorage.getItem('token'));
  });

  it('tests that buttons work properly when logged out',() => {
    const header = render(<App />);
    expect(header.findByText('Registrer deg'));
    const buttonHome = header.container.getElementsByClassName(
      'btn btn-outline-danger'
    )[0].firstElementChild;
    buttonHome.click();
    expect(header.findByText('Brukernavn'));
    const buttonLogOut = header.container.getElementsByClassName(
      'btn btn-outline-danger'
    )[1].firstElementChild;
    buttonLogOut.click();
    expect(header.findByText('Velkommen'));
  });
*/
