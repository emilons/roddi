import React from 'react';
import ReactDOM from 'react-dom';
import MyEstates from '../MyEstates';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('Renders MyEstates', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyEstates></MyEstates>, div);
});
it('renders correctly', () => {
  const RenderResult = render(<MyEstates />);
  expect(RenderResult.container.getElementsByTagName('p')).toBeDefined();
});
