import { createStore } from 'redux';
import reducer from './reducer';

export default function buildStore() {
    return createStore(reducer);
}
