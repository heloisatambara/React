// import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  /* constructor(props) {
    super(props);
    this.handlePClick = this.handlePClick.bind(this); // so handlePClick() can use "this" attributes even if its not an arrow function

    this.state = {
      name: 'Helo',
      counter: 0
    };
  }*/
  
  state = {
    count: 0,
    posts: []
  };

  timeoutUpdate = null;


  // I created
  handlePClick = () => {
    // whenever state is chagned, render is called again
    this.setState({name: 'tambara'});
  }

  // I created
  handleAClick = (event) => {
    // arrow function doesn't need bind to use "this" attributes
    event.preventDefault() // prevents clicking from taking us to the page with the link
    const {counter} = this.state;
    this.setState({counter: counter + 1});
  }

  // function that is called if render() goes ok
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

    const [posts] = await Promise.all([postsResponse]);

    const postsJson = await posts.json(); // takes the response and transforms into json

    this.setState({posts: postsJson});
    
  }
  

 // function called when screen is updated
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

  // render - visual screen
  render() {
    const { posts, count } = this.state;

    return (
      // can only return one element
      <div className="posts">
        <h1>{count}</h1>
      {posts.map(post =>
        <div className="postCard" key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>  
      )}
    </div>
    );
  }
}

/* function App() {
  return (
     // elemento root - necessario ao react
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {1+1} - código Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

export default App;
