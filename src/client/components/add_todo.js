import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button, Input, Spin } from 'antd';

export const Wrapper = styled.section`
  margin-bottom: 10px;
`;

export const Spinner = styled.span`
  margin-left: 10px;
`;

class AddTodo extends React.Component {
  state = { name: '' };
  handleChange = event => this.setState({ name: event.target.value });
  handleClickAdd = () => {
    const { onAddTodo } = this.props;
    onAddTodo(this.state.name);
    this.setState({ name: '' });
  };
  handleClickFilter = () => {
    const { onFilterTodo } = this.props;
    onFilterTodo(this.state.name);
    this.setState({ name: '' });
  }
  handleKey = (event) => {
    if (event.key === 'Enter') {
      const { onAddTodo } = this.props;
      onAddTodo(this.state.name);
      this.setState({ name: '' });
    }
  }
  render() {
    const { name } = this.state;
    const { currentLoads } = this.props;
    return (
      <Wrapper>
        <Input
          style={{ width: '35%' }}
          placeholder="new todo"
          onChange={this.handleChange}
          onKeyPress={this.handleKey}
          value={name}
        />
        <Button onClick={this.handleClickAdd}>Add</Button>
        <Button onClick={this.handleClickFilter}>Filter</Button>
        <Spinner>
          {currentLoads >= 1 && <Spin size="large" />}
        </Spinner>
      </Wrapper>
    );
  }
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  onFilterTodo: PropTypes.func.isRequired,
  currentLoads: PropTypes.number.isRequired,
};

export default AddTodo;
