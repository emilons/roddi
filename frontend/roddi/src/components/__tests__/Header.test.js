/*
 *  CASER Å TESTE I DENNE KOMPONENTEN 
 * 1) Riktige knapper vises logget inn/ikke logget inn/admin/ikke admin/page 
 * 2) rendrer riktig 
 * 3) redirects funker
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header.js';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("Renders Header", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header></Header>, div)
});

it("Header renders logo correctly", () => {
    const RenderResult = render(<Header/>);
    expect(screen.getByAltText("logoen")).toBeInTheDocument();
})

