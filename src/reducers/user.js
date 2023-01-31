// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      name: action.payload.name,
    };
  default:
    return state;
  }
}

export default user;
