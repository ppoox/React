import React, { Component } from 'react';
import './App.css';
import BoardInsert from './BoardInsert';
import BoardDelete from './BoardDelete';

class App extends Component {
  state= {
    boards:[]
}


  render() {
    return (
      <div className="App">
          <BoardInsert />
          
      </div>
    );
  }
}

export default App;
