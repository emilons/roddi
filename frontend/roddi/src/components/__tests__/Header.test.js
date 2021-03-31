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
import sinon from 'sinon';

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

it('Tests that buttons work properly for admin', () => {
  localStorage.setItem('token', 'test');
  localStorage.setItem('isAdmin', 'true');
  const adminHeader = render(<Header />);
  expect(adminHeader.getByText('Hjem'));
  const buttonAdminHome = adminHeader.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[0].firstElementChild;
  buttonAdminHome.click();
  expect(adminHeader.findByText('Opprett dødsbo'));
  const buttonStats = adminHeader.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[1].firstElementChild;
  buttonStats.click();
  expect(adminHeader.findByText('Statistikk for Røddi'));
});

it('tests that buttons work properly for user', async () => {
  localStorage.setItem('isAdmin', 'false');
  localStorage.setItem('token', 'test');
  const userHeader = render(<Header />);
  expect(userHeader.findByText('Hjem'));
  const buttonHome = userHeader.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[0].firstElementChild;
  buttonHome.click();
  expect(userHeader.container.getElementsByClassName('estateList'));
});

it('tests that buttons work properly when logged out', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  const header = render(<Header />);
  expect(header.getByText('Registrer deg'));
  expect(header.getByText('Logg Inn'));
  const buttonLogIn = header.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[0];
  buttonLogIn.click();
  expect(header.findByText('Velkommen'));
  const buttonHome = header.container.getElementsByClassName(
    'btn btn-outline-danger'
  )[0].firstElementChild;
  buttonHome.click();
  expect(header.findByText('Brukernavn'));
});
