import React from 'react';
import ReactDOM from 'react-dom';
import MemberVotes from '../MemberVotes';
import {render, cleanup, screen, fireEvent} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("Renders votes", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MemberVotes></MemberVotes>, div)
});

it("renders correctly", () => {
    const RenderResult = render(<MemberVotes />);
    expect(RenderResult.container.getElementsByTagName('Fragment')).toBeDefined();
    expect(RenderResult.container.getElementsByClassName('voteDivide')).toBeDefined();
    expect(RenderResult.container.getElementsByClassName('voteDonate')).toBeDefined();
    expect(RenderResult.container.getElementsByClassName('voteTrash')).toBeDefined();
})