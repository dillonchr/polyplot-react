import React, { Component } from 'react';
import Maps from './maps.service';

const styles = {
    background: 'magenta',
    bottom: 0,
    height: '100vh',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw'
}

class App extends Component {
    map;

  render() {
    return (
      <div style={styles} ref={elem => this.dom = elem}></div>
    );
  }

  componentDidMount() {
      this.map = new Maps(this.dom);
  }
}

export default App;
