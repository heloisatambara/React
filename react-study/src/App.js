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
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json(); // takes the response and transforms into json
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return {...post, cover: photosJson[index].url}
    })

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
    const { posts} = this.state;

    return (
      // can only return one element
      <section className="container">
        <div className="posts">
          {posts.map(post =>
            <div className='post'>
              <img src = {post.cover} alt = {post.title}/>
              <div className="post-content" key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          )}
        </div>
      </section>
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
