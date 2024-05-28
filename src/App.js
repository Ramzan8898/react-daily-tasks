import React from 'react'
import { IoIosAddCircle } from "react-icons/io";
import { GrEdit, GrTrash } from "react-icons/gr";
import { MdFactCheck } from "react-icons/md";
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
    this.setState({ tasks, editIndex: null, editInput: '' }, () => {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    });
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

  cloneTable = () => {
    alert("i am cilcked");
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

  handleDelete = (index) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((_, i) => i !== index);
    this.setState({ tasks: updatedTasks });
  }

  

  render() {

    return <>

      <div className="container my-5 d-flex ">
        <input type="text" placeholder='Your Task' className='form-control w-50 p-2'
          name='task' value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
        <IoIosAddCircle onClick={this.addTodo} style={{ fontSize: '45px', color: 'white', cursor: 'pointer', marginLeft: '20px' }} />
        <MdFactCheck style={{ fontSize: '45px', color: 'white', cursor: 'pointer', marginLeft: '20px' }} onClick={this.cloneTable}/>
      </div>
      <div className='container p-3' >
        <table  className='table table-hover table-dark ' style={{ tableLayout: 'fixed', width: '300px' }}>

            <thead>
              <tr>
                <th style={{ width: "30px" }}>#</th>
                <th className='text-center'>Task</th>
                <th style={{ width: "70px" }}>Actions</th>
              </tr>
            </thead>
            {this.state.tasks.length !== 0 ? (
              <tbody className='w-100'>
                {this.state.tasks.map((task, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => this.handleMouseEnter(index)}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    <td style={{ wordWrap: 'break-word' }}>{index + 1}</td>
                    <td style={{ wordWrap: 'break-word', textAlign: 'left' }}>
                      {this.state.editIndex === index ? (
                        <input
                          style={{ width: "150px", background: 'white', outline: '0px', border: '0px', color: "black", caretColor: "red" }}
                          type="text"
                          value={this.state.editInput}
                          onChange={this.handleEditChange}
                          onBlur={() => this.saveEdit(index)}
                          onKeyDown={(event) => {
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
                        <>
                          <GrEdit onClick={() => this.handleEdit(index)} style={{ cursor: 'pointer' }} />
                          <GrTrash onClick={() => this.handleDelete(index)} style={{ cursor: 'pointer', margin: '0px 10px 0px 10px' }} />
                        </>
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
