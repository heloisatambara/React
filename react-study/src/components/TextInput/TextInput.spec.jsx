import { TextInput } from ".";

import { React, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<TextInput/>", () => {
    it("should have a value of searchValue", () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={"test"} />);

        const input = screen.getByPlaceholderText(/Search posts/i);
        expect(input.value).toBe("test");
    });

    it("should call handleChange function on each key pressed", () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={"value"} />);

        const input = screen.getByPlaceholderText(/Search posts/i);

        const value = "value";

        userEvent.type(input, value);

        expect(input.value).toBe("value");
        expect(fn).toHaveBeenCalledTimes(value.length);
    });

    it("should match snapshot", () => {
        const fn = jest.fn();
        const { container } = render(
            <TextInput handleChange={fn} searchValue={"test"} />
        );
        expect(container).toMatchSnapshot();
    });
});
