import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';

import LoginContainer, { Login } from './Login';
import { Provider } from 'react-redux';
import initialStore from '../../redux';

describe('Login', () => {
  let props;
  let wrapper;
  let store;

  const setUp = (props = null, store) => {
    if (props) {
      return mount(<Login {...props} />);
    }

    return mount(
      <Provider store={store}>
        <LoginContainer />
      </Provider>
    );
  };

  const elements = wrapper => {
    let username = wrapper.find('input#text-username');
    let password = wrapper.find('input#text-password');
    let button = wrapper.find('button#button-login');

    return [username, password, button];
  };

  const typing = (element, name, value) => {
    element.simulate('change', {
      target: {
        name: name,
        value: value
      }
    });
  };

  beforeEach(() => {
    props = {};
    store = initialStore();
    wrapper = setUp(store);
    moxios.install();
  });

  afterEach(() => {
    props = {};
    wrapper = '';
    store = {};
    moxios.uninstall();
  });

  it('should render element correctly', () => {
    expect(wrapper.find('form#form-login').length).toEqual(1);
    expect(wrapper.find('input#text-username').length).toEqual(1);
    expect(wrapper.find('input#text-password').length).toEqual(1);
    expect(wrapper.find('button#button-login').length).toEqual(1);
  });

  it('should typing value in to username text', () => {
    let username = wrapper.find('input#text-username');

    expect(username.length).toEqual(1);

    username.simulate('change', {
      target: {
        name: 'username',
        value: 'admin'
      }
    });

    wrapper.update();
    username = wrapper.find('input#text-username');

    expect(username.prop('value')).toEqual('admin');
  });

  it('should typing value in to password text', () => {
    let [username, password] = elements(wrapper);
    expect(password.length).toEqual(1);

    typing(password, 'password', 'is-password');

    [username, password] = elements(wrapper);
    expect(password.prop('value')).toEqual('is-password');
  });

  it('should disabled button when not typing value in username or password', () => {
    let [username, password, button] = elements(wrapper);

    expect(username.length).toEqual(1);
    expect(password.length).toEqual(1);
    expect(button.length).toEqual(1);
    expect(button.prop('disabled')).toEqual(true);
  });

  it('should enabled button when typing value in username and password', () => {
    let [username, password, button] = elements(wrapper);

    expect(username.length).toEqual(1);
    expect(password.length).toEqual(1);
    expect(button.length).toEqual(1);
    expect(button.prop('disabled')).toEqual(true);

    typing(username, 'username', 'admin');
    typing(password, 'password', 'admin');
    // wrapper.update();

    [username, password, button] = elements(wrapper);

    expect(username.prop('value')).toEqual('admin');
    expect(password.prop('value')).toEqual('admin');
    expect(button.prop('disabled')).toEqual(false);
  });

  it('should call action login when submit form', done => {
    props = {
      ...props,
      history: {
        push: jest.fn()
      },
      login: jest.fn().mockResolvedValue({})
    };

    let wrapper = setUp(props);
    let [username, password, button] = elements(wrapper);

    expect(username.length).toEqual(1);
    expect(password.length).toEqual(1);
    expect(button.length).toEqual(1);
    expect(button.prop('disabled')).toEqual(true);

    typing(username, 'username', 'admin');
    typing(password, 'password', 'admin');

    [username, password, button] = elements(wrapper);

    expect(username.prop('value')).toEqual('admin');
    expect(password.prop('value')).toEqual('admin');
    expect(button.prop('disabled')).toEqual(false);

    button.simulate('submit');

    expect(props.login).toHaveBeenCalledWith({
      username: 'admin',
      password: 'admin'
    });

    setTimeout(() => {
      expect(props.history.push).toHaveBeenCalledWith('/products');
      done();
    });
  });

  describe('Store:', () => {
    it('should call action login when submit form success', done => {
      let wrapper = setUp(null, store);
      let [username, password, button] = elements(wrapper);

      expect(username.length).toEqual(1);
      expect(password.length).toEqual(1);
      expect(button.length).toEqual(1);
      expect(button.prop('disabled')).toEqual(true);

      typing(username, 'username', 'admin');
      typing(password, 'password', 'admin');

      [username, password, button] = elements(wrapper);

      expect(username.prop('value')).toEqual('admin');
      expect(password.prop('value')).toEqual('admin');
      expect(button.prop('disabled')).toEqual(false);

      button.simulate('submit');

      moxios.stubRequest('http://localhost:10003/api/v-test/login', {
        status: 200,
        response: {
          accessToken: 'alsdkfj;j;jika;',
          roles: ['admin', 'manager']
        }
      });

      moxios.wait(() => {
        const { auth } = store.getState();
        expect(auth.isAuthenticated).toEqual(true);
        expect(auth.loading).toEqual(false);

        done();
      });
    });

    it('should call action login when submit form fail', done => {
      let wrapper = setUp(null, store);
      let [username, password, button] = elements(wrapper);

      typing(username, 'username', 'admin');
      typing(password, 'password', 'admin');

      [username, password, button] = elements(wrapper);
      expect(username.prop('value')).toEqual('admin');
      expect(password.prop('value')).toEqual('admin');
      expect(button.prop('disabled')).toEqual(false);

      button.simulate('submit');

      moxios.stubRequest('http://localhost:10003/api/v-test/login', {
        status: 400,
        response: {
          message: 'Username or password is invalid.'
        }
      });

      moxios.wait(() => {
        const { auth } = store.getState();
        expect(auth.isAuthenticated).toEqual(false);
        expect(auth.loading).toEqual(false);

        wrapper.update();
        expect(wrapper.find('span#error-message').text()).toEqual(
          'Username or password is invalid.'
        );

        done();
      });
    });
  });
});
