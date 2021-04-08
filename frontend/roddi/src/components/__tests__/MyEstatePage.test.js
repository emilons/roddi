import React from 'react';
import ReactDOM from 'react-dom';
import MyEstatePage from '../MyEstatePage';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(cleanup);

it('Renders MyEstates', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyEstatePage></MyEstatePage>, div);
});

it('renders correctly', () => {
  const RenderResult = render(<MyEstatePage />);
  expect(RenderResult.container.getElementsByTagName('h1')).toBeDefined();
  expect(RenderResult.container.getElementsByTagName('h2')[0]).toBeDefined();
  expect(
    RenderResult.container.getElementsByTagName('h2')[0]
  ).toHaveTextContent('Familien');
  expect(RenderResult.container.getElementsByTagName('h2')[1]).toBeDefined();
  expect(
    RenderResult.container.getElementsByTagName('h2')[1]
  ).toHaveTextContent('Eiendeler');
  expect(
    RenderResult.container.getElementsByClassName('itemsList')
  ).toBeDefined();
});
