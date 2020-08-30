/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  Platform, StyleSheet ,View,Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Homes from './Menu/Home/Homes';
import Masakan from './Menu/Masakan/Masakan';
import Restaurant from './Menu/Restaurant';
import Kota from './Menu/Kota/Kota';
import Category from "./Menu/Category/Category";

const Router = createStackNavigator({
    Home:{
      screen:Homes,
    },
    Masakan:{
      screen:Masakan
    },
    Restaurant:{
      screen:Restaurant
    },
    Kota:{
      screen:Kota
    },
    Category:{
      screen:Category
    }
},
{initialRouteName:'Home'})
export default createAppContainer(Router); 