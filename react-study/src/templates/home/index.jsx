// import logo from './logo.svg';
import './styles.css';
import { Component } from 'react';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2
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

  // render - visual screen
  render() {
    const {posts, postsPerPage, allPosts, page} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    return (
      // can only return one element
      <section className="container">
        <Posts posts={posts}/>
        <div className="button-container">
          <Button
            text = "Load more posts"
            onClick = {this.loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      </section>
    );
  }
}



