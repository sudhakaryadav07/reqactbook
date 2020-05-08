import { createStore } from 'redux';
import reducers from './reducer';

const store = createStore(reducers);
store.subscribe(() => {
    store.getState()
})

export default store;
