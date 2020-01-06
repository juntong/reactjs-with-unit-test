import { mockStore } from '../../../__mocks__/store';
import { login } from '../auth-action';
import moxios from 'moxios';

describe('auth-action', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
    moxios.install();
  });

  afterEach(() => {
    store = {};
    moxios.uninstall();
  });

  it('should create action correctly when call login success', done => {
    moxios.stubRequest('http://localhost:10003/api/v-test/login', {
      status: 200,
      response: {
        accessToken: 'abcd',
        name: 'vasit'
      }
    });

    let payload = {
      username: 'admin',
      password: 'password'
    };

    store.dispatch(login(payload)).catch(error => {
      expect(error.message).toEqual('Username or password is invalid.');
    });

    moxios.wait(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'auth/login-request'
        },
        {
          type: 'auth/login-success',
          payload: {
            name: 'vasit'
          }
        }
      ]);
      done();
    });
  });

  it('should create action correctly when call login fail', done => {
    moxios.stubRequest('http://localhost:10003/api/v-test/login', {
      status: 400,
      response: {
        message: 'Username or password is invalid.'
      }
    });

    let payload = {
      username: 'admin',
      password: 'password'
    };

    store.dispatch(login(payload)).catch(error => {
      expect(error.message).toEqual('Username or password is invalid.');
    });

    moxios.wait(() => {
      expect(store.getActions()).toEqual([
        {
          type: 'auth/login-request'
        },
        {
          type: 'auth/login-fail'
        }
      ]);
      done();
    });
  });
});
