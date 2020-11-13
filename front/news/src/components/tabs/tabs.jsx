import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import './tabs.css';

function Tabs({ curTab, setTab, items, className }) {
  return (
    <MenuList className={`tabs-list ${className}`}>
      {items.map((el, id) => {
        return (
          <MenuItem
            className={
              "tabs-list__tab" + (curTab === el.value
                ? " tabs-list__tab_active"
                : "")
            }
            key={id}
            onClick={() => setTab(el.value)}
          >
            {el.text}
          </MenuItem>
        );
      })}
    </MenuList>
  );
}

export default Tabs;