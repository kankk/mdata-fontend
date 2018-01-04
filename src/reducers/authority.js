const defaultState = []

export const aModule = (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case 'INIT_MODULES':
      return [...state, ...action.modules];
    default:
      return state;
  }
}