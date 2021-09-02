import Link from 'next/link'

interface MenuItemProps {
    path: string;
    name: string;
    handleClick: () => void;
}

export default function MenuItem(props: MenuItemProps) {
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