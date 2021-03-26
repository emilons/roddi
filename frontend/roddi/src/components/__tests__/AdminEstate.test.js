import React from 'react';
import ReactDOM from 'react-dom';
import AdminEstates from '../AdminEstates';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';


const inputMock = jest.fn();


afterEach(cleanup);

it("Renders Admins estate page", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdminEstates></AdminEstates>, div)
});

it("Renders correctly", () => {
    const RenderResult = render(<AdminEstates />);
    expect(RenderResult.container.getElementsByTagName("form")[0]).toBeDefined();
    expect(RenderResult.container.getElementsByTagName("p")[0]).toBeDefined();
    expect(RenderResult.container.getElementsByTagName("p")[0]).toHaveTextContent("ALLE DØDSBO:");
    expect(RenderResult.container.getElementsByClassName("createEstate")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("estates")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("estateList")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("btn btn-outline-danger")).toBeDefined();
    expect(screen.getByPlaceholderText("Skriv inn navn på dødsbo")).toBeInTheDocument();
});

/*
 * CASER Å TESTE I DENNE KOMPONENTEN: 
 * 1) fyll inn et navn, trykk "opprett dødsbo", verifiser at det dukker på på skjermen
 * 2) Trykk på "go to estate", verifiser at du sendes videre til ny path.
 */


/*
test('Input', () => {
    const container = render(<AdminEstatePage />);
  
    const input = container.getByPlaceholderText('Skriv inn navn på dødsbo') as HTMLInputElement;
  
    fireEvent.change(input, { target: { value: 'Hansen' } });
    expect(input.value).toBe('Hansen');
    expect(inputMock.mock.calls).toHaveLength(1);
});*/