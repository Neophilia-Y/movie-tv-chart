import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Root from './navigation/Root';

const queryClient = new QueryClient();


export default function App() {

  const isDark = useColorScheme() === "dark";
  const DarkMode = true;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={DarkMode ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
