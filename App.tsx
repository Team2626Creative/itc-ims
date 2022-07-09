
import React from 'react';
import ProductSelectScreen from './src/screens/ProductSelectScreen';
import { View, StyleSheet, StatusBar,useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Router from './src/router';
import store from "./src/redux/store"
import { Provider } from 'react-redux';
import ImagePickerSlide from './src/components/image-picker-slide';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={[styles.root,backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        {/* <Router/> */}
        <ImagePickerSlide/>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  root:{
    flex:1
  }
});

export default App;
