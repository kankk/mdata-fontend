const defaultState = []

export const aModule = (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case 'INIT_MODULES':
      if (state.length > 0) {
        return [...state];
      } else {
        return [...state, ...action.modules];
      }
    default:
      return state;
  }
}