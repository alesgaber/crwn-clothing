import React from "react";
import {withRouter} from 'react-router-dom'

import "./menu-item.styles.scss";

const MenuItem = ({ title, linkUrl, imageUrl, size, history, match }) =>
  <div className={`${size} menu-item`} onClick={()=> history.push(`${match.url}${linkUrl}`)}>
    <div className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="content">
      <h1 className="title">
        {title.toUpperCase()}
      </h1>
      <span> {JSON.stringify(history)}</span>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>;

export default withRouter(MenuItem);
