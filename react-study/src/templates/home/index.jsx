// import logo from './logo.svg';
import './styles.css';
import { Component } from 'react';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
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



