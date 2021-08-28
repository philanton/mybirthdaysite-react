import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from './components/Header';
import WelcomeContent from './components/WelcomeContent';
import SurveyHomeContent from './components/SurveyHomeContent';
import SurveyContent from './components/SurveyContent';
import HistoryContent  from './components/HistoryContent';
import LogInForm from './components/LogInForm';
import HomeContent from './components/HomeContent';
import WeatherTable from './components/WeatherTable';


class ScrollToTop extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

interface AppState {
  loggedIn: boolean;
};

export default class App extends React.Component {
  state: AppState = {
    loggedIn: !!(localStorage.getItem('email') && localStorage.getItem('password'))
  };

  render() {
    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/welcome">
            <img className="ducky sunrise" src={require("./img/ducky_sunrise.png").default} alt=""/>
          </Route>
          <Route exact path="/survey-home">
            <img className="ducky sunset" src={require("./img/ducky_sunset.png").default} alt=""/>
          </Route>
          <Route path={["/home", "/login", "/forecast", "/survey", "/history"]}>
            <Header loggedIn={this.state.loggedIn}/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/welcome">
            <WelcomeContent />
          </Route>
          <Route path="/survey-home">
            <SurveyHomeContent />
          </Route>
          <Route path="/survey">
            <SurveyContent />
          </Route>
          <Route path="/history">
            <HistoryContent />
          </Route>
          {!this.state.loggedIn ? (
            <Route path="/login">
              <LogInForm
                setLoggedIn={(value: boolean) => this.setState({ loggedIn: value })}
              />
            </Route>
          ) : (
            <Route path="/forecast">
              <WeatherTable />
            </Route>
          )}
          <Route path="/home">
            <HomeContent loggedIn={this.state.loggedIn}/>
          </Route>
          <Route path="*">
            <Redirect to="/home"></Redirect>
          </Route>
        </Switch>
      </Router>
    );
  }
}