import React from 'react'
import { Link } from 'react-router-dom'

interface MenuProps {
    menuOpened: boolean;
    loggedIn: boolean;
    itemClickHandler: () => void;
}

const Menu: React.FC<MenuProps> = props => {
  return (
    <div className={props.menuOpened ? "menu" : "hidden"}>
      <div>
        <Link to="/home" className="menu-item" onClick={props.itemClickHandler}>home</Link>
        {!props.loggedIn ? (
          <Link to="/login" className="menu-item" onClick={props.itemClickHandler}>log in</Link>
        ) : (
          <Link to="/forecast" className="menu-item" onClick={props.itemClickHandler}>weather</Link>
        )}
        <Link to="/survey" className="menu-item" onClick={props.itemClickHandler}>survey</Link>
        <Link to="/history" className="menu-item" onClick={props.itemClickHandler}>history</Link>
      </div>
    </div>
  );
}

export default Menu;