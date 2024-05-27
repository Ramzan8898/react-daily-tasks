import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      input: ''
    }
  }


  componentDidMount() {
    const savedTodos = localStorage.getItem('tasks');
    if (savedTodos) {
      this.setState({ tasks: JSON.parse(savedTodos) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }
  addTodo = () => {
    const { tasks, input } = this.state;
    if (input.trim() !== '') {
      this.setState({
        tasks: [...tasks, input],
        input: ''
      },
        () => {
          localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        }
      )
    }
  }

  render() {

    return <>

      <div className="container my-5 d-flex ">
        <input type="text" placeholder='Your Task' className='form-control w-50 p-2'
          name='task' value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
        <IoIosAddCircle onClick={this.addTodo} style={{ fontSize: '45px', color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
      </div>
      <div className='container' >
        <table className='table table-dark table-hover border-primary w-25 rounded-pil'>
          <thead>
            <tr>
              <th className='h4'>#</th>
              <th scope="col">
                <h5 className=' text-white'>Tasks</h5>
              </th>
            </tr>
          </thead>
          {this.state.tasks.length !== 0 ? (
            <tbody className='w-100'>
              {this.state.tasks.map((task, index) => (
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
