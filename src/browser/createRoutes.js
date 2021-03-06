import App from './app/App.react';
import Auth from './auth/Page.react';
import Home from './home/Page.react';
import Me from './me/Page.react';
import NotFound from './notfound/Page.react';
import Profile from './me/Profile.react';
import React from 'react';
import Settings from './me/Settings.react';
import Todos from './todos/Page.react';
import TwitterApp from './twitter/Page.react';
import {IndexRoute, Route} from 'react-router';

export default function createRoutes(getState) {


  const requireAuth = (nextState, replace) => {
    const loggedInUser = getState().users.viewer;
    if (!loggedInUser) {
      replace({
        pathname: '/login',
        state: {nextPathname: nextState.location.pathname}
      });
    }
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={TwitterApp} />
      // Commented standard este features to hide pages
    /*  <Route component={Auth} path="login" />
      <Route component={Me} onEnter={requireAuth} path="me">
        <Route component={Profile} path="profile" />
        <Route component={Settings} path="settings" />
      </Route>
      <Route component={Todos} path="todos" />
      <Route component={TwitterApp} path="twitter" />
      <Route component={NotFound} path="*" />*/
    </Route>
  );

}
