const defaultState = {
  id: '',
  username: '',
  role: '',
  logined: false
}

const user = (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        ...action.user,
        logined: true
      });
    case 'LOGOUT':
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
}

export default user;