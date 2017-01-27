import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Hero } from './hero';

export const Container = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  margin: 0;
`;

const ListHeros = ({ actions, heros }) =>
  <Container>
    {
      heros.map(hero => <Hero
        actions={actions}
        hero={hero}
        key={hero.id}
      />)
    }
  </Container>
  ;

ListHeros.propTypes = {
  actions: PropTypes.object.isRequired,
  heros: PropTypes.array.isRequired,
};

export default ListHeros;
