import React, { Component } from 'react'

import './App.css';

class App extends Component {
  
  state = {
    tasks:[],
    item:''
  }
  handleInput = (e) => {
    this.setState({
      item:e.target.value,
      [e.target.name ] : e.target.value
    })
    console.log(e.target.value);
  }
  
  render() {
    return  <>
    <h1 className='text-center mt-5 text-white'>Daily Task List</h1>
    
    <div className="container my-5">
    <input type="text" placeholder='Your Task' className='form-control w-50 p-3 '
    name='task' value={this.state.item} onChange={this.handleInput}/> 
    </div>
    
    
    </>
    
    
  }
}




export default App;
