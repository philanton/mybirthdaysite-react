import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props: {loggedIn: boolean}) {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick: () => void = () => setMenuOpened(!menuOpened);

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
      <Menu menuOpened={menuOpened} loggedIn={props.loggedIn} itemClickHandler={handleClick}/>
    </>
  );
}

function Menu(props: {
  menuOpened: boolean,
  loggedIn: boolean,
  itemClickHandler: () => void
}) {
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