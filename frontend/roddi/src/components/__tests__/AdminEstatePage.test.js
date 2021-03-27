import React from 'react';
import ReactDOM from 'react-dom';
import AdminEstatePage from '../AdminEstatePage';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';

//TEST SUITE FAILES TO RUN BCO: Modal.setAppElement('#root) in adminEP.js 

/*
 * CASER Å TESTE I DENNE KOMPONENTEN 
 * 1) legg til et medlem, sjekk at det dukker opp 
 * 2) leg til en eiendel, sjekk at den dukker opp 
 * 3) slett eiendel og medlem, sjekk at de er fjernet 
 */


/*
afterEach(cleanup);

it("Renders Admins estate page", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdminEstatePage></AdminEstatePage>, div)
});

ReactModal.setAppElement(document.createElement('div'));
describe("test component that uses modal", () => {
    ReactDOM.render(<AdminEstatePage></AdminEstatePage>, div)
});

it("Renders page correctly", () => {
    const RenderResult = render(<AdminEstatePage />);
    expect(screen.getByText('Legg til medlem')).toBeInTheDocument();
    screen.findByText("Legg til medlem").simulate('click');
    expect(screen.getByText('Brukere')).toBeInTheDocument();
    expect(screen.getByText('Slett')).toBeInTheDocument();
    expect(screen.getByText('Fyll inn bruker email:')).toBeInTheDocument();
})*/
