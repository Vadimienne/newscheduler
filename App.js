/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Root from './src/index.js'

const App: () => React$Node = () => {

  return (
    <>
        <NavigationContainer>
            <Root />
        </NavigationContainer>
    </>
  );
};



export default App;
