import { SETTINGS_UPDATE } from '../actions/settings';

export default function settings(state = { }, action) {
    switch (action.type) {
        case SETTINGS_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
