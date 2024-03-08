import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigator from './Navigator';

function App() {

   return (
      <Provider store={store}>
         <Navigator />
      </Provider>
   );
}

export default App;
