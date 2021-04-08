import React from 'react';
import ReactDOM from 'react-dom';
import Statistics from '../Statistics';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('Renders Admins estate page', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Statistics></Statistics>, div);
});

it('Renders correctly', () => {
  const RenderResult = render(<Statistics />);
  expect(screen.getByRole('table'));
  expect(screen.getByText('Brukere registrert idag')).toBeInTheDocument();
  expect(
    screen.getByText('Antall stemmer på eiendeler i dag')
  ).toBeInTheDocument();
  expect(screen.getByText('Totalt antall dødsbo')).toBeInTheDocument();
  expect(screen.getByText('Totalt antall brukere')).toBeInTheDocument();
});
