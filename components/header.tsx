import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header(props: {loggedIn: boolean}) {
  const [menuOpened, setMenuOpened] = useState(false);

  const handleClick: () => void = () => setMenuOpened(!menuOpened);

  return (
    <>
      <header>
        <Link href="/">
          <a className={menuOpened ? "icon-s" : "icon-m"}>
            {menuOpened ? (
              <Image
                src={require("../public/img/ducky_logo_sec.png")}
                width={32}
                height={32}
                alt=""
              />
            ) : (
              <Image
                src={require("../public/img/ducky_logo.png")}
                width={48}
                height={48}
                alt=""
              />
            )}
          </a>
        </Link>
        <h1>My birthday party</h1>
        <div className="icon-s">
          <Image
            src={menuOpened ?
              require("../public/img/close.png") :
              require("../public/img/menu.png")
            }
            width={32}
            height={32}
            alt=""
            onClick={handleClick}
          />
        </div>
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
        <MenuItem path="/" name="home"  handleClick={props.itemClickHandler} />
        {!props.loggedIn ? (
          <MenuItem path="/login" name="log in"  handleClick={props.itemClickHandler} />
        ) : (
          <MenuItem path="/forecast" name="weather"  handleClick={props.itemClickHandler} />
        )}
          <MenuItem path="/survey" name="survey"  handleClick={props.itemClickHandler} />
          <MenuItem path="/history" name="history"  handleClick={props.itemClickHandler} />
      </div>
    </div>
  );
}

function MenuItem(props: {
  path: string,
  name: string,
  handleClick: () => void,
}) {
  return (
    <Link href={props.path}>
      <a
        className="menu-item"
        onClick={props.handleClick}
      >
        {props.name}
      </a>
    </Link>
  );
}