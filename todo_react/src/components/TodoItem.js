import React, { Component } from 'react'
import TodoApi from '../api/todo'
import deleteIcon from '../images/delete.svg'
import editIcon from '../images/edit.svg'
import cancelIcon from '../images/cancel.svg'
import submitIcon from '../images/submit.svg'

class TodoItem extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        let { task, id, done } = this.props.todo
        this.state = {
            editing: false,
            text: task,
            todo: {
                task,
                id,
                done,
            }
        }
    }

    onEdit = () => {
        this.setState({
            editing: true,
        })
    }

    onDelete = () => {
        let { id } = this.state.todo
        let todoId = String(id)
        this.api.delete(todoId, (r) => {
            this.props.onDelete(id)
        })
    }

    updateTodo(todoId, data) {
        this.api.update(todoId, data, (r) => {
            this.setState({
                todo: r,
                editing: false,
            })
            this.updateCounter()
        })
    }

    onSubmit = () => {
        let { id } = this.state.todo
        let text = this.state.text
        let todoId = String(id)
        let data = {
            task: text
        }
        this.updateTodo(todoId, data, )
    }

    onCancel = () => {
        this.setState({
            editing: false,
        })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    updateCounter() {
        let func = this.props.onUpdate
        func(this.state.todo)
    }

    toggleComplete = () => {
        let { id, done } = this.state.todo
        let data = {
            done: !done,
        }
        let todoId = String(id)
        this.updateTodo(todoId, data)
    }

    render() {
        let {id, task, done} = this.state.todo
        let todo = null
        if (this.state.editing) {
            todo = (
                <div>
                    <img src={cancelIcon} onClick={this.onSubmit}/>
                    <img src={submitIcon}  onClick={this.onCancel}/>
                    <input type="text" value={this.state.text} onChange={this.onChange}/>
                </div>
            )
        } else {
            todo = (
                <div>
                    <img src={editIcon} onClick={this.onEdit}/>
                    <img src={deleteIcon} onClick={this.onDelete}/>
                    <div className={"taskName"} onClick={this.toggleComplete}>{task}</div>
                </div>
            )
        }
        let cls = done ? 'complete' : ''
        return (
            <div className={`todo-cell ${cls}`}>
                {todo}
            </div>
        )
    }
}

export default TodoItem
