import React from 'react';
import ReactDOM from 'react-dom';
import RegisterUser from '../RegisterUser';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';

afterEach(cleanup);

it('Renders register ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterUser></RegisterUser>, div);
});

it('Register renders correctly', () => {
  const RenderResult = render(<RegisterUser />);
  expect(screen.getByText('Brukernavn')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('Skriv inn ditt fulle navn')
  ).toBeInTheDocument();

  expect(screen.getByText('E-post')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('Skriv inn din e-post')
  ).toBeInTheDocument();

  expect(screen.getByText('Passord')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Velg et passord')).toBeInTheDocument();

  expect(screen.getByText('Bekreft passord')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Bekreft passordet')).toBeInTheDocument();

  expect(screen.getByText('Registrer deg')).toBeInTheDocument();
  expect(
    screen.getByText('Allerede bruker? Logg inn her.')
  ).toBeInTheDocument();

  expect(RenderResult.container.getElementsByTagName('small')[0]).toBeDefined();
});
