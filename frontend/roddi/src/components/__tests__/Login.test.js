import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("Renders log in", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div)
})

it("Login renders correctly", () => {
    const RenderResult = render(<Login />);
    expect(screen.getByPlaceholderText('Skriv inn ditt brukernavn')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Skriv inn ditt passord')).toBeInTheDocument();
    expect(screen.getByText("Logg inn")).toBeInTheDocument();
    expect(RenderResult.container.getElementsByTagName("form")[0]).toBeDefined();
})

/*
 * CASER Å TESTE I DENNE KOMPONENTEN
 * 1) prøv å logg inn med ugyldig bruker, sjekk at felmelding/ingen redirect
 * 2) logg inn med gyldig bruker, sjekk at redirect 
 * (Vet ikke helt hvordan vi får testet dette uten backend/med mock)
 */

/*
it("test clickOn", () => {
    const RenderResult = render(<Login />);
    const handleSubmit = jest.fn();
    fireEvent.click(
        RenderResult.container.getElementsByTagName('button')[0]
      );
      expect(handleSubmit).toHaveBeenCalled();
    
    const renderResult = render(<Login />);
    const onClick = jest.fn();
    fireEvent.click(renderResult.getByText('Logg inn'));
    expect(onClick).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/Login');
    
})*/

//TEST FUNCTIONALITY HERE