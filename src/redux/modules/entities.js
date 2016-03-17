import Immutable from 'immutable';

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  users: {},
});
export default function entitiesReducer(state = initialState, action) {
  if (action.payload && action.payload.entities) {
    return state.merge(action.payload.entities);
  }

  return state;
}
