export const initialState = {
  isAuthenticated: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'auth/login-request':
      return {
        ...state,
        loading: true
      };
    case 'auth/login-success':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        name: action.payload.name
      };
    case 'auth/login-fail':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
