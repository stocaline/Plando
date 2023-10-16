import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import Routes from './src/routes';
import { TaskProps } from './src/@types/task';
import { GlobalContext } from './src/contexts/GlobalContex';

function App(): JSX.Element {
  const [tasksList, setTasksList] = useState<TaskProps[]>([])
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="light-content" translucent={false} />
      <GlobalContext.Provider value={{tasksList, setTasksList}}>
        <Routes />
      </GlobalContext.Provider>
    </NavigationContainer>
  );
}

export default App;
