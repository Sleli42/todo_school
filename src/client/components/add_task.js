import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';

export const Wrapper = styled.section`
  display: flex;
  margin: 0.5em 0;
`;

class AddTask extends React.Component {
  state = { name: '' };
  handleChange = event => this.setState({ name: event.target.value })
  handleClick = () => {
    const { onAddTask, todoId } = this.props;
    onAddTask(this.state.name, todoId);
    this.setState({ name: '' });
  };
  handleKey = (event) => {
    if (event.key === 'Enter') {
      const { onAddTask, todoId } = this.props;
      onAddTask(this.state.name, todoId);
      this.setState({ name: '' });
    }
  }
  render() {
    const { name } = this.state;
    return (
      <Wrapper>
        <Input
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          placeholder="new task"
          value={name}
        />
        <Button type="ghost" onClick={this.handleClick}>Add</Button>
      </Wrapper>
    );
  }
}

AddTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  todoId: PropTypes.string.isRequired,
};

export default AddTask;
