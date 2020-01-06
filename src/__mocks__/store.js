import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const mockStore = (initialState = {}) => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  return mockStore(initialState);
};
