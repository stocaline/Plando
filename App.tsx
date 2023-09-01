import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import Routes from './src/routes'; 

function App(): JSX.Element {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="#fff" barStyle="light-content" translucent={false} />
        <Routes />
      </NavigationContainer>
    );
  }

export default App;
