import React from 'react';
<<<<<<< HEAD
import './App.css';
import AppRouter from './AppRouter';
=======
import { Provider } from 'react-redux';
import { store } from 'Store/store';
import './App.css';

import AppRouter from './AppRouter';
import TrackAuthState from 'lib/TrackAuthState';
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365

function App() {
  return (
    <div className='app'>
<<<<<<< HEAD
      <AppRouter />
=======
      <Provider store={store}>
        <TrackAuthState />
        <AppRouter />
      </Provider>
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
    </div>
  );
}

export default App;
