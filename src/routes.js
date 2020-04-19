import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import User from './pages/User';
import Main from './pages/Main';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#7159c1',
                    },
                    headerBackTitleStyle: {
                        backgroundColor: '#7159c1',
                    },
                    headerTintColor: '#FFF',
                }}
            >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="User" component={User} />
                <Stack.Screen name="Repository" component={Repository} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
