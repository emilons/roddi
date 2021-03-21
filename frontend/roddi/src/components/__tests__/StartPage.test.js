import React from 'react';
import ReactDOM from 'react-dom';
import StartPage from '../StartPage';
import {render, cleanup, screen} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("Renders the start page", () => {
    const div = document.createElement("div");
    ReactDOM.render(<StartPage></StartPage>, div)
})

it("StartPage renders correctly", () => {
    render(<StartPage />);
    expect(screen.getByText('Velkommen til Røddi')).toBeInTheDocument();
    expect(screen.getByText('Nettsiden som gjør oppgjør av dødsbo enkelt og sømløst')).toBeInTheDocument();
})
