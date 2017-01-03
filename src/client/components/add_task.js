import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  margin-bottom: 10px;
`;

const AddTask = () =>
  <Wrapper>
    <input placeholder="todo to do ..." />
    <button>+</button>
  </Wrapper>
  ;

export default AddTask;
