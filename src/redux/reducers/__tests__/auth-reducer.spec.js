import reducer, { initialState } from '../auth-reducer';

describe('auth-reducer', () => {
  it('should return initial state correctly', () => {
    expect(
      reducer(undefined, {
        type: ''
      })
    ).toEqual({
      ...initialState
    });
  });

  it('should return initial state correctly when type is "auth/login-request"', () => {
    expect(
      reducer(undefined, {
        type: 'auth/login-request'
      })
    ).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should return initial state correctly when type is "auth/login-success"', () => {
    expect(
      reducer(undefined, {
        type: 'auth/login-success',
        payload: {
          name: 'vasit'
        }
      })
    ).toEqual({
      ...initialState,
      loading: false,
      isAuthenticated: true,
      name: 'vasit'
    });
  });

  it('should return initial state correctly when type is "auth/login-fail"', () => {
    expect(
      reducer(undefined, {
        type: 'auth/login-fail'
      })
    ).toEqual({
      ...initialState,
      loading: false
    });
  });
});
