import React, { PropTypes } from 'react';
import ToolTip from 'rc-tooltip';
import styles from './RoomNavItem.css';
import 'rc-tooltip/assets/bootstrap.css';

const RoomNavItem = ({ children, name }) =>
  <ToolTip overlayClassName={styles.tooltip} placement="right" overlay={<span>{name}</span>}>
    <div className={styles.container}>
      {!children &&
        <div>
          {name.match(/\b(\w)/g).join('').substring(0, 3).toUpperCase()}
        </div>
      }
      {children &&
        <div>{children}</div>
      }
    </div>
  </ToolTip>;

RoomNavItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default RoomNavItem;
