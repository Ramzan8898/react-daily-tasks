import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      input: '',
      editIndex: null,
      editInput: '',
      hoveredRowIndex: null,
      isContentEditable: false
    }
  }

  handleMouseEnter = (index) => {
    this.setState({ hoveredRowIndex: index });
  }

  handleEdit = (index) => {
    let data = this.state.tasks[index];
    this.setState({ editIndex: index, editInput: data });

  }
  handleEditChange = (event) => {
    this.setState({ editInput: event.target.value });
  }
  saveEdit = (index) => {
    const { tasks, editInput } = this.state;
    tasks[index] = editInput;
    this.setState({ tasks, editIndex: null, editInput: '' });
  }

  handleMouseLeave = () => {
    this.setState({ hoveredRowIndex: null });
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
      <div className='container'>
        <table className='table table-hovered w-25 table-dark'>
          {this.state.tasks.length !== 0 ? (
            <tbody className='w-100'>
              {this.state.tasks.map((task, index) => (
                <tr
                  key={index}
                  onMouseEnter={() => this.handleMouseEnter(index)}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <td>{index + 1}</td>
                  <td>
                    {this.state.editIndex === index ? (
                      <input
                        type="text"
                        value={this.state.editInput}
                        onChange={this.handleEditChange}
                        onBlur={() => this.saveEdit(index)}
                        onKeyPress={(event) => {
                          if (event.key === 'Enter') {
                            this.saveEdit(index);
                          }
                        }}
                      />
                    ) : (
                      task
                    )}
                  </td>
                  <td>
                    {this.state.hoveredRowIndex === index && (
                      <GrEdit onClick={() => this.handleEdit(index)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="3">No todos found.</td>
              </tr>
            </tbody>
          )}
        </table>

      </div>

    </>
  }
}
export default App;
