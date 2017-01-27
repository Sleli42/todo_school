import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

export const Area = styled.li`
  background: white;
  list-style: none;
  border: solid black;
  width: 300px;
  padding: 1em;
  margin: 1em 0.5em 0 0;
`;

export const WrapTitle = styled.section`
  text-align: center;
  padding: 0.5em;
  text-transform: uppercase;
  margin-bottom: 0.5em;
`;

export const Picture = styled.img`
  display: block;
  margin: 1em auto;
`;

const HeroThumbnail = ({ thumbnail }) =>
  <Picture
    role="presentation"
    src={`${thumbnail.path}.${thumbnail.extension}`}
    width="200px"
    height="150px"
  />
;

HeroThumbnail.propTypes = {
  thumbnail: PropTypes.object.isRequired,
};

export const HeroName = ({ name }) =>
  <WrapTitle>
    <h3>{name}</h3>
  </WrapTitle>
  ;

HeroName.propTypes = {
  name: PropTypes.string.isRequired,
};

const Hero = ({ actions, hero }) => {
  const handleClick = () => {
    actions.loadDataHero(hero.id);
  };
  return (
    <Area>
      <HeroName name={hero.name} />
      <HeroThumbnail thumbnail={hero.thumbnail} />
      <Button style={{ width: '100%' }} onClick={handleClick}>more infos</Button>
    </Area>
  );
};

Hero.propTypes = {
  actions: PropTypes.object.isRequired,
  hero: PropTypes.object.isRequired,
};

export {
  Hero,
  HeroThumbnail,
};
