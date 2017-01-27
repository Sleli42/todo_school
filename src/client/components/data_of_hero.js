import styled from 'styled-components';
import React, { PropTypes } from 'react';
import { HeroThumbnail } from './hero';
import { Button } from 'antd';

export const Area = styled.li`
  background: white;
  list-style: none;
  border: solid black;
  width: 600px;
  height: auto;
  padding: 1em;
  margin: 1em 0.5em 0 0;
`;

export const WrapTitleComics = styled.span`
  text-align: center;
`;

export const WrapTitleSeries = styled.span`
  text-align: center;
`;

const DisplayItemComics = ({ name }) =>
  <WrapTitleComics>
    <li>{name}</li>
  </WrapTitleComics>
  ;

DisplayItemComics.propTypes = {
  name: PropTypes.string.isRequired,
};

const DisplayItemSeries = ({ name }) =>
  <WrapTitleSeries>
    <li>{name}</li>
  </WrapTitleSeries>
  ;

DisplayItemSeries.propTypes = {
  name: PropTypes.string.isRequired,
};

const ListSeries = ({ series }) => {
  const { items } = series;
  return (
    <ul>
      {
      items.map((item, index) => <DisplayItemSeries
        name={item.name}
        key={index}
      />)
    }
    </ul>
  );
};

ListSeries.propTypes = {
  series: PropTypes.object.isRequired,
};

const ListComics = ({ comics }) => {
  const { items } = comics;
  return (
    <ul>
      {
      items.map((item, index) => <DisplayItemComics
        name={item.name}
        key={index}
      />)
    }
    </ul>
  );
};

ListComics.propTypes = {
  comics: PropTypes.object.isRequired,
};

const DataOfHero = ({ actions, data }) => {
  const handleClick = () => {
    actions.closeHero(data[0].id);
  };
  const { comics, description, series, thumbnail } = data[0];
  return (
    <Area>
      <Button onClick={handleClick} style={{ width: '100%' }}>back</Button>
      <h2>{description}</h2>
      <HeroThumbnail thumbnail={thumbnail} />
      <h1>comics</h1>
      <ListComics comics={comics} />
      <h1>series</h1>
      <ListSeries series={series} />
    </Area>
  );
};

DataOfHero.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default DataOfHero;
