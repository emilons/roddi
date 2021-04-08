import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('Renders log in', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login></Login>, div);
});

it('Login renders correctly', () => {
  const RenderResult = render(<Login />);
  expect(
    screen.getByPlaceholderText('Skriv inn ditt brukernavn')
  ).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('Skriv inn ditt passord')
  ).toBeInTheDocument();
  expect(screen.getByText('Logg inn')).toBeInTheDocument();
  expect(RenderResult.container.getElementsByTagName('form')[0]).toBeDefined();
});
