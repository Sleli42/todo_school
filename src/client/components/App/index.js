import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../header';
import AddTodo from '../add_todo';
import TodoList from '../todo_list';
import actionList from '../../actions';

export const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export const App = ({ todos, tasks, currentLoads, actions }) =>
  <Wrapper>
    <Header />
    <AddTodo
      onAddTodo={actions.addTodo}
      onFilterTodo={actions.filterTodo}
      currentLoads={currentLoads}
    />
    <TodoList tasks={tasks} todos={todos} actions={actions} />
  </Wrapper>
  ;

App.propTypes = {
  actions: PropTypes.object.isRequired,
  currentLoads: PropTypes.number.isRequired,
  todos: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionList, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
