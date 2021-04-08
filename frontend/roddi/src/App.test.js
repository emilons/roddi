import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

afterEach(cleanup);

it('renders the app', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App></App>, div);
});

it('renders the header and startpage', () => {
  const app = render(<App></App>);
  expect(screen.getByRole('navigation'));
  expect(app.container.getElementsByClassName('startPage'));
});
