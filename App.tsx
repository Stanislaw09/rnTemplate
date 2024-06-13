import * as React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import Navigator from './Navigator';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Navigator />
         </PersistGate>
      </Provider>
   );
}

export default App;
