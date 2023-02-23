// import logo from './logo.svg';
import './styles.css';
import { Component } from 'react';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';

export class Home extends Component {
  /* constructor(props) {
    super(props);
    this.handlePClick = this.handlePClick.bind(this); // so handlePClick() can use "this" attributes even if its not an arrow function

    this.state = {
      name: 'Helo',
      counter: 0
    };
  }*/
  
  state = {
    posts: []
  };

  // function that is called if render() goes ok
  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    this.setState({posts: postsAndPhotos});
  }
  

 /*/ function called when screen is updated
 // handles changes after componentDidMount()
  componentDidUpdate() {
    const { posts, count } = this.state;
    this.timeoutUpdate = setTimeout (() => {
      this.setState({count: count + 1, posts})
    }, 1000);
  }

  // function called when screen will unmount
  // used to clean whatever componentDidMount() did, so it can mount again
  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }
  */

  // render - visual screen
  render() {
    const {posts} = this.state;

    return (
      // can only return one element
      <section className="container">
        <Posts posts={posts}/>
      </section>
    );
  }
}



