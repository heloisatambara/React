// import logo from './logo.svg';
import "./styles.css";
import { useEffect, useState, useCallback } from "react";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

// using Hooks - function instead of class
export const Home = () => {
    // this instead of state
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(2);
    const [searchValue, setSearchValue] = useState("");
    const filteredPosts = searchValue
        ? allPosts.filter((post) => {
              return post.title
                  .toLowerCase()
                  .includes(searchValue.toLowerCase());
          })
        : posts;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    // async bc of the fetch in loadPosts()
    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
        const postsAndPhotos = await loadPosts();

        setPosts(postsAndPhotos.slice(page, postsPerPage));
        setAllPosts(postsAndPhotos);
    }, []);

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

        posts.push(...nextPosts);

        setPage(nextPage);
        setPosts(posts);

        console.log("more posts loaded");
    };

    // live typing on inputs
    const handleChange = (e) => {
        const { value } = e.target;

        setSearchValue(value);

        console.log({ value });
    };

    useEffect(() => {
        console.log(new Date().toLocaleString("pt-br"));
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    return (
        // can only return one element
        <section className="container">
            <div className="search-container">
                {!!searchValue && <h1>Searching for: {searchValue}</h1>}

                <TextInput
                    searchValue={searchValue}
                    handleChange={handleChange}
                />
            </div>

            {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

            {filteredPosts.length === 0 && <h1>No search results found.</h1>}

            <div className="button-container">
                {!searchValue && (
                    <Button
                        text="Load more posts"
                        onClick={loadMorePosts}
                        disabled={noMorePosts}
                    />
                )}
            </div>
        </section>
    );
};

/*

export class Home2 extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue:''
  };


  // function that is called if render() goes ok
  async componentDidMount() {
    await this.loadPosts();
  }


  // async bc of the fetch in loadPosts()
  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos});
  }

  loadMorePosts = () => {
    const {postsPerPage, page, allPosts, posts} = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage+postsPerPage);
    posts.push(...nextPosts);
    this.setState({
      page: nextPage,
      posts
    })
    console.log("more posts loaded")
  }


  // live typing on inputs
  handleChange = (e) => {
    const {value} = e.target;
    this.setState({searchValue: value} );
    console.log({value});
  }


  // render - visual screen
  render() {
    const {posts, postsPerPage, allPosts, page, searchValue} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts =
      !!searchValue
      ? allPosts.filter(post => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      // can only return one element
      <section className="container">

        <div className="search-container">

          {!!searchValue && (
            <h1>Searching for: {searchValue}</h1>
          )}

          <TextInput searchValue = {searchValue} handleChange = {this.handleChange}/>

        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <h1>No search results found.</h1>
        )}


        <div className="button-container">
          {!searchValue && (
            <Button
              text = "Load more posts"
              onClick = {this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>

      </section>
    );
  }
}



 */
