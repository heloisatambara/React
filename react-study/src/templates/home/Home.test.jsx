import {
    render,
    screen,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
/*
test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
 */

const handlers = [
    rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    userId: 1,
                    id: 1,
                    title: "title1",
                    body: "body1",
                },
                {
                    userId: 2,
                    id: 2,
                    title: "title2",
                    body: "body2",
                },
                {
                    userId: 3,
                    id: 3,
                    title: "title3",
                    body: "body3",
                },
            ])
        );
    }),
    rest.get(
        "https://jsonplaceholder.typicode.com/photos",
        async (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        url: "img1.jpg",
                    },
                    {
                        url: "img2.jpg",
                    },
                ])
            );
        }
    ),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
    beforeAll(() => {
        server.listen();
    });

    afterEach(() => server.resetHandlers());

    afterAll(() => {
        server.close();
    });

    it("should render search, posts and load more", async () => {
        render(<Home />);
        const noMorePosts = screen.getByText("No search results found.");

        expect.assertions(3);

        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText(/search posts/i);
        expect(search).toBeInTheDocument();

        const images = screen.getAllByRole("img", /title/i);
        expect(images).toHaveLength(2);

        const button = screen.getByRole("button", /load more posts/i);
        expect(button).toBeInTheDocument();

        screen.debug();
    });

    it("should search for posts", async () => {
        render(<Home />);
        const noMorePosts = screen.getByText("No search results found.");

        expect.assertions(10);

        await waitForElementToBeRemoved(noMorePosts);

        const search = screen.getByPlaceholderText(/search posts/i);

        expect(
            screen.getByRole("heading", { name: "title1" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "title2" })
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: "title3" })
        ).not.toBeInTheDocument();

        userEvent.type(search, "title1");

        expect(
            screen.getByRole("heading", { name: "title1" })
        ).toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: "title2" })
        ).not.toBeInTheDocument();
        expect(
            screen.queryByRole("heading", { name: "title3" })
        ).not.toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "Searching for: title1" })
        ).toBeInTheDocument();

        userEvent.clear(search);

        expect(
            screen.getByRole("heading", { name: "title1" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: "title2" })
        ).toBeInTheDocument();

        userEvent.type(search, "blablabla");

        expect(
            screen.getByText("No search results found.")
        ).toBeInTheDocument();
    });

    it("should load more posts", async () => {
        render(<Home />);
        const noMorePosts = screen.getByText("No search results found.");

        // expect.assertions(3);

        await waitForElementToBeRemoved(noMorePosts);

        const button = screen.getByRole("button", /load more posts/i);

        userEvent.click(button);

        expect(
            screen.getByRole("heading", { name: "title3" })
        ).toBeInTheDocument();

        expect(button).toBeDisabled();
    });
});
