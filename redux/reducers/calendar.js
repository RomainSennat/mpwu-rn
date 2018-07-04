import { CALENDAR_UPDATE } from '../actions/calendar';

const initial_state = {
    times: [ ]
};

export default function calendar(state = initial_state, action) {
    switch (action.type) {
        case CALENDAR_UPDATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
