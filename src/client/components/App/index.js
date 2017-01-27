import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionList from '../../actions';
import ListHeros from '../list_heros';
import DataOfHero from '../data_of_hero';

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const App = ({ actions, heros, dataHero }) =>
  <Wrapper>
    <Title>Marvel App</Title>
    {dataHero.moreData === 0 ?
      <ListHeros actions={actions} heros={heros} />
    :
      <DataOfHero actions={actions} data={dataHero} />
    }
  </Wrapper>
  ;

App.propTypes = {
  actions: PropTypes.object.isRequired,
  dataHero: PropTypes.object.isRequired,
  heros: PropTypes.array.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionList, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(App);
