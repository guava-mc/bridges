/*
    App Navigation to house switch navigators.
*/
import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Splash from './splash';
import Register from './register';
import Home from './home';
import Login from './login';
import AutoLogin from './autoLogin';

const cont = createStackNavigator(
  {
    Splash: Splash,
    Register: Register,
    Login: Login,
    AutoLogin: AutoLogin,
    Home: Home,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigation = createAppContainer(cont);

export default AppNavigation;
