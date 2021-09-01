import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";

import WelcomeContent from './components/WelcomeContent';
import SurveyHomeContent from './components/SurveyHomeContent';
import SurveyContent from './components/SurveyContent';
import HistoryContent  from './components/HistoryContent';
import LogInForm from './components/LogInForm';
import HomeContent from './components/HomeContent';
import WeatherTable from './components/WeatherTable';
import PrivateRoute from './components/routes/PrivateRoute';
import RestrictedRoute from './components/routes/RestrictedRoute';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/welcome" component={WelcomeContent} />
        <Route path="/survey-home" component={SurveyHomeContent} />
        <Route path="/survey" component={SurveyContent} />
        <Route path="/history" component={HistoryContent} />
        <RestrictedRoute path="/login" component={LogInForm} />
        <PrivateRoute path="/forecast" component={WeatherTable} />
        <Route path="/home" component={HomeContent} />
        <Route path="*">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}