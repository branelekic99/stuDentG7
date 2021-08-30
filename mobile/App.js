import React from 'react';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";

import { StyleSheet} from 'react-native';
import Navigation from "./navigation/Navigation";
import allReducers from "./redux-store/reducers";
import Interceptor from "./api/apiInterceptor";

const store = createStore(allReducers,applyMiddleware(ReduxThunk));
// Interceptor.interceptor(store);

export default function App() {
  return (
      <Provider store={store}>
        <Navigation />
      </Provider>
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
