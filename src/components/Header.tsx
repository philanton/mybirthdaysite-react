import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import checkAuth from '../utils/checkAuth'

const Header: React.FC<{}> = props => {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick = useCallback(() => {
    setMenuOpened(!menuOpened);
  }, [menuOpened]);

  return (
    <>
      <header>
        <Link to="/home" className={menuOpened ? "icon-s" : "icon-m"}>
          <img
            src={menuOpened ?
              require("../img/ducky_logo_sec.png").default :
              require("../img/ducky_logo.png").default
            }
            alt=""
          />
        </Link>
        <h1>My birthday party</h1>
        <img
          src={menuOpened ?
            require("../img/close.png").default :
            require("../img/menu.png").default
          }
          className="icon-s"
          alt=""
          onClick={handleClick}
        />
      </header>
      <Menu menuOpened={menuOpened} loggedIn={checkAuth()} itemClickHandler={handleClick}/>
    </>
  );
}

export default Header;
