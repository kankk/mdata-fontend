const defaultState = {
  username: '',
  logined: false
}

const user = (state = defaultState, action) => {
  const { type } = action;
  switch (type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        username: action.username,
        logined: true
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        username: '',
        logined: false
      });
    default:
      return state;
  }
}

export default user;