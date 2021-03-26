import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Item from '../Item';
import {render, cleanup, screen} from '@testing-library/react'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

it("renders item", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Item></Item>, div)
});

/*
 * CASER Å TESTE I DENNE KOMPONENTEN: 
 * 1) opprett et item. Sjekk at ting rendrer riktig 
 */

/*
//test that sofa is rendered to te paragraph.
it("Renders with correct text", () => {
    const fakeItem = new Item();
    //fakeItem.state.name = "sofa"
    //fakeItem.setState(name="sofa");
    const RenderResult = render(<Item {...fakeItem.props} name="sofa"/>);
    expect(RenderResult.container.getElementByText("sofa")[0]).toBeDefined();
    //render(fakeItem);
    //expect(screen.getByTestId('para')).toHaveTextContent("sofa");
    //expect(screen.getElementsByClassName('Item')).toHaveTextContent("sofa");
    //expect(screen.findByRole('p')).toBeInTheDocument();
    //const wrapper = mount(<Item name="sofa" />);
    //expect(wrapper.find('Sofa').notToBeNull())
    //expect(screen.getByText("sofa")).toBeInTheDocument();

})*/
