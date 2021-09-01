import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PathFirewall } from '../pages/_app';

export default function Header(props: {menuPathes: PathFirewall[]}) {
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
      <div className={menuOpened ? "menu" : "hidden"}>
        <div>
          {props.menuPathes.map(data => (
            <MenuItem
              path={data.path}
              name={data.name}
              handleClick={handleClick}
              key={data.path}
            />
          ))}
        </div>
      </div>
    </>
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