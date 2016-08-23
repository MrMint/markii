import React, { PropTypes } from 'react';
import ToolTip from 'rc-tooltip';
import styles from './NavItem.css';
import 'rc-tooltip/assets/bootstrap.css';

const NavItem = ({ children, name, slug, onNavigate, isActive }) =>
  <ToolTip overlayClassName={styles.tooltip} placement="right" overlay={<span>{name}</span>}>
    <div className={isActive ? styles.active : styles.container} onClick={() => onNavigate(slug)}>
      {!children &&
        <div>
          {
            name
              .match(/\b(\w)/g)
              .join('')
              .substring(0, 3)
              .toUpperCase()
          }
        </div>
      }
      {children &&
        <div>{children}</div>
      }
    </div>
  </ToolTip>;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default NavItem;
