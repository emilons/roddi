import React from 'react';
import ReactDOM from 'react-dom';
import AdminEstatePage from '../AdminEstatePage';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

/*
 * CASER Å TESTE I DENNE KOMPONENTEN
 * 1) legg til et medlem, sjekk at det dukker opp
 * 2) leg til en eiendel, sjekk at den dukker opp
 * 3) slett eiendel og medlem, sjekk at de er fjernet
 */

afterEach(cleanup);

it('renders Admins estate page', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminEstatePage></AdminEstatePage>, div);
});


it('renders modals', () => {
  const RenderResult = render(<AdminEstatePage></AdminEstatePage>);
  expect(screen.getByText('Legg til medlem')).toBeInTheDocument();
  expect(screen.getByText('Legg til eiendel')).toBeInTheDocument();
  const button = screen.getByText('Legg til medlem');
  button.click();
  expect(screen.getByText('Brukere')).toBeInTheDocument();
  expect(screen.getByLabelText('Fyll inn bruker email:'));
  expect(screen.getByRole('textbox'));
  const button2 = screen.getByText('Legg til eiendel');
  button2.click();
  expect(screen.getByText('Legg til en eiendel')).toBeInTheDocument();
  expect(screen.getByLabelText('Legg til en beskrivelse'));
  expect(screen.getByText('Legg til et bilde'));
  expect(screen.getByTestId('Velg fil'));
});
