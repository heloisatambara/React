import { render, screen, fireEvent } from '@testing-library/react'
import {Button} from '.';

describe('<Button/>', () => {
    it('should render the button with the text "Load more posts"', () => {
        render(<Button text="Load more posts"/>);
        expect.assertions(1);

        const button = screen.getByRole('button', {name: /load more posts/i});
    
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text="Load more posts" onClick={fn}/>);

        const button = screen.getByRole('button', {name: /load more posts/i});
      
        fireEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });


    it('should be disabled when disabled is true', () => {
        render(<Button text="Load more posts" disabled={true}/>);
        const button = screen.getByRole('button', {name: /load more posts/i});

        expect(button).toBeDisabled();
    });

    it('should match snapshot', ()=>{
        const fn = jest.fn();
        const {container} = render(<Button text="Load more posts" disabled={true} onClick={fn}/>);
        expect(container.firstChild).toMatchSnapshot();
    })
});