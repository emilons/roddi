/*
 *  CASER Å TESTE I DENNE KOMPONENTEN 
 * 1) Riktige knapper vises logget inn/ikke logget inn/admin/ikke admin/page 
 * 2) rendrer riktig 
 * 3) redirects funker
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header.js';
import {render, cleanup, screen} from '@testing-library/react'; 
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

afterEach(cleanup);

it("Renders Header", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Header></Header>, div)
});

it("Header renders logo correctly", () => {
    const RenderResult = render(<Header/>);
    expect(screen.getByAltText("logoen")).toBeInTheDocument();
})

it("Renders correct buttons when logged in", () => {
    const buttonsLoggedIn = [<button class="btn btn-outline-danger"><a href="#/MyEstates">Hjem</a></button>, <button class="btn btn-outline-danger">Logg Ut</button>]; 
    localStorage.setItem('token', 'test');
    localStorage.setItem('isAdmin', 'false');
    const wrapper = render(<Header/>);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger').length).toEqual(2);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[0].firstElementChild.innerHTML).toEqual('Hjem');
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[1].innerHTML).toEqual('Logg Ut');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
})

it("Renders correct buttons when admin is logged in", () => {
    const buttonsLoggedIn = [<button class="btn btn-outline-danger"><a href="#/MyEstates">Hjem</a></button>, <button class="btn btn-outline-danger">Logg Ut</button>]; 
    localStorage.setItem('token', 'test');
    localStorage.setItem('isAdmin', 'true');
    const wrapper = render(<Header/>);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger').length).toEqual(3);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[0].firstElementChild.innerHTML).toEqual('Hjem');
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[1].firstElementChild.innerHTML).toEqual('Statistikk');
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[2].innerHTML).toEqual('Logg Ut');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
})

it("Renders correct buttons when logged out", () => {
    const buttonsLoggedIn = [<button class="btn btn-outline-danger"><a href="#/MyEstates">Hjem</a></button>, <button class="btn btn-outline-danger">Logg Ut</button>]; 
    const wrapper = render(<Header/>);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger').length).toEqual(2);
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[0].firstElementChild.innerHTML).toEqual('Registrer deg');
    expect(wrapper.container.getElementsByClassName('btn btn-outline-danger')[1].firstElementChild.innerHTML).toEqual('Logg Inn');
})
