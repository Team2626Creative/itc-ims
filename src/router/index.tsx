import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../screens/OrderScreen';
// import BottomTabNav from './bottomTabNav';
import ProductSelectScreen from '../screens/ProductSelectScreen';
const Stack = createNativeStackNavigator();
// 8214
export const IndexRoutes = {
  HOME:'Home',
  ORDER:'Order',
}
const Router = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName={IndexRoutes.HOME}>
        <Stack.Screen name={IndexRoutes.HOME} component={ProductSelectScreen} />
        <Stack.Screen name={IndexRoutes.ORDER} component={OrderScreen} />
        {/* <ProductSelectScreen/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;