import logo from './logo.svg';
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
    name: 'helo',
    counter: 0
  }

  handlePClick = () => {
    // whenever state is chagned, render is called again
    this.setState({name: 'tambara'});
  } 

  handleAClick = (event) => {
    // arrow function doesn't need bind to use "this" attributes
    event.preventDefault() // prevents clicking from taking us to the page with the link
    const {counter} = this.state;
    this.setState({counter: counter + 1});
  }



  render() {
    const { name, counter } = this.state;

    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        <a onClick={this.handleAClick}
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
  }
}

/*
function App() {
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
}
*/

export default App;
