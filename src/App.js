import React, { Component } from 'react'

import './App.css';

class App extends Component {

  state = {
    tasks: [],
    input: ''
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem('tasks');
    if (savedTodos) {
      this.setState({ tasks: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.tasks));
  }
  addTodo = () => {
    const { tasks, input } = this.state;
    if (input.trim() !== '') {
      this.setState({
        tasks: [...tasks, input],
        input: ''
      })
    }
  }

  render() {
    const { tasks, input } = this.state;

    return <>

      <div className="container my-5 d-flex justify-content-evenly">
        <input type="text" placeholder='Your Task' className='form-control w-50 p-3 '
          name='task' value={input} onChange={(e) => this.setState({ input: e.target.value })} />
        <button className='btn btn-warning ' onClick={this.addTodo}>Add</button>
      </div>
      <div className='container' >
        <table className='table table-dark table-hover border-primary w-25 rounded-pil'>
          <thead>
            <tr>
              <th className='h4'>#</th>
              <th scope="col">
                <h4 className='text-center text-white'>Daily Tasks</h4>
              </th>
            </tr>
          </thead>
          {tasks.length !== 0 ? (
            <tbody className='w-100'>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task}</td>
                </tr>
              ))}
            </tbody>
          ) : null}

        </table>

      </div>

    </>
  }
}
export default App;
