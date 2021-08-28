import React from 'react';
import { Link } from 'react-router-dom';


interface HeaderProps {
  loggedIn: boolean;
}

interface HeaderState {
  menuOpened: boolean;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    menuOpened: false
  }

  handleClick() {
    this.setState({ menuOpened: !this.state.menuOpened })
  }

  render() {
    return (
      <>
        <header>
          <Link to="/home" className={this.state.menuOpened ? "icon-s" : "icon-m"}>
            <img
              src={this.state.menuOpened ?
                require("../img/ducky_logo_sec.png").default :
                require("../img/ducky_logo.png").default
              }
              alt=""
            />
          </Link>
          <h1>My birthday party</h1>
          <img
            src={this.state.menuOpened ?
              require("../img/close.png").default :
              require("../img/menu.png").default
            }
            className="icon-s"
            alt=""
            onClick={this.handleClick.bind(this)}
          />
        </header>
        <Menu
          menuOpened={this.state.menuOpened}
          loggedIn={this.props.loggedIn}
          itemClickHandler={this.handleClick.bind(this)}/>
      </>
    );
  }
}

interface MenuProps {
  menuOpened: boolean;
  loggedIn: boolean;
  itemClickHandler: () => void;
}

class Menu extends React.Component<MenuProps> {
  render() {
    return (
      <div className={this.props.menuOpened ? "menu" : "hidden"}>
        <div>
          <Link to="/home" className="menu-item" onClick={this.props.itemClickHandler}>home</Link>
          {!this.props.loggedIn ? (
            <Link to="/login" className="menu-item" onClick={this.props.itemClickHandler}>log in</Link>
          ) : (
            <Link to="/forecast" className="menu-item" onClick={this.props.itemClickHandler}>weather</Link>
          )}
          <Link to="/survey" className="menu-item" onClick={this.props.itemClickHandler}>survey</Link>
          <Link to="/history" className="menu-item" onClick={this.props.itemClickHandler}>history</Link>
        </div>
      </div>
    );
  }
}