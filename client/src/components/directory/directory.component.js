import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selector';
import MenuItem from '../menu-item/menu-item.component';

import { DirectoryMenuContainer } from './directory.styles';
// import './directory.styles.scss';

const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSections }) => (
      <MenuItem key={id} {...otherSections} />
    ))}
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
