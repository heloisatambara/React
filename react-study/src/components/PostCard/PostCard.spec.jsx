import { React, render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard/>", () => {
    it("should render PostCard correctly", () => {
        render(<PostCard post={props} />);

        expect(screen.getByAltText(/title/i)).toHaveAttribute(
            "src",
            "img/img.png"
        );
        expect(
            screen.getByRole("heading", { name: /title/i })
        ).toBeInTheDocument();
        expect(screen.getByText("body")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        const { container } = render(<PostCard post={props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
