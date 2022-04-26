import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import NoteEditor from './screens/NoteEditor';
import About from './screens/About';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{
          title: 'YOUR NOTES',
          headerStyle:{
            backgroundColor: '#393E46',
          },
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="noteEditor" component={NoteEditor} options={{
          title: 'Note - Editor',
          headerStyle:{
            backgroundColor: '#222831',
          },
          headerTintColor: '#fff'
        }}/>
        <Stack.Screen name="about" component={About} options={{
          title: 'About and Guide',
          headerStyle:{
            backgroundColor: '#EEEEEE',
          },
          headerTintColor: '#393E46'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
