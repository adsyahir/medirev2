/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Navigation from './navigation/Navigation';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Navigation />
      </ApplicationProvider>

  );
}


export default App;
