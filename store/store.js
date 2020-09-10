import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default {store, persistor};