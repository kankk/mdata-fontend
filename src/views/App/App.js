import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  async componentDidMount() {
    const res = await fetch('/api/');
    const text = await res.text();
    this.setState({
      text
    })
  }

  render() {
    return (
      <div className="App">
        { this.state.text }
      </div>
    );
  }
}

export default App;
