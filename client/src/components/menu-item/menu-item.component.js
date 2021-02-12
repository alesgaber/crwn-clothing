/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle,
} from './menu-item.styles';
// import './menu-item.styles.scss';

const MenuItem = ({ title, linkUrl, imageUrl, size, history, match }) => (
  <MenuItemContainer
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    onKeyDown={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className="background-image"
      imageUrl={imageUrl}
    />
    <ContentContainer>
      <ContentTitle> {title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
