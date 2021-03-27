import React from 'react';
import ReactDOM from 'react-dom';
import RegisterUser from '../RegisterUser';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';
import { Router } from 'react-router-dom';

/*
afterEach(cleanup);

it("Renders register ", () => {
    const div = document.createElement("div");
    ReactDOM.render(<RegisterUser></RegisterUser>, div)
});

it("Register renders correctly", () => {
    const RenderResult = render(<RegisterUser />);
    excpect(screen.getByLabelText("Brukernavn")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Skriv inn ditt fulle navn')).toBeInTheDocument();

    excpect(screen.getByLabelText("Email-Adresse")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Skriv inn din Email')).toBeInTheDocument();

    excpect(screen.getByLabelText("Passord")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Velg et passord')).toBeInTheDocument();
    
    excpect(screen.getByLabelText("Bekreft passord")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Bekreft passordet')).toBeInTheDocument();

    expect(screen.getByText("Registrer deg")).toBeInTheDocument();
    expect(screen.getByText(" Allerede bruker? Logg inn her.")).toBeInTheDocument();

    expect(RenderResult.container.getElementsByTagName("small")[0]).toBeDefined();
});*/