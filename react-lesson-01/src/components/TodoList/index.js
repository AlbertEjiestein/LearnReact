import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

export default class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })).isRequired
  }
  render() {
    return (
      <div>
        {
          this.props.todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                onCompeletedChange={this.props.onCompeletedChange}
              />
            )
          })
        }
      </div>
    )
  }
}
