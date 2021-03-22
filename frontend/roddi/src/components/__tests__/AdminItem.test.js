import React from 'react';
import ReactDOM from 'react-dom';
import AdminItem from '../AdminItem';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("Renders Admins estate page", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdminItem></AdminItem>, div)
});

it("Renders correctly", () => {
    const RenderResult = render(<AdminItem />);
    expect(RenderResult.container.getElementsByTagName('img')).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("estateNameAndItem")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("userInteractionsList")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("userNameAndComment")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("userVotes")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("esteteName")).toBeDefined();
    expect(RenderResult.container.getElementsByClassName("item")).toBeDefined();
    RenderResult.container.get

});