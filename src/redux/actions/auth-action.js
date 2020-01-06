import axios from 'axios';

export const login = ({ username, password }) => {
  return dispatch => {
    dispatch({
      type: 'auth/login-request'
    });

    return new Promise((resolve, reject) => {
      return axios
        .post('http://localhost:10003/api/v-test/login', {
          username,
          password
        })
        .then(response => {
          dispatch({
            type: 'auth/login-success',
            payload: {
              name: response.data.name
            }
          });

          return resolve(response.data);
        })
        .catch(error => {
          dispatch({
            type: 'auth/login-fail'
          });

          return reject(error.response.data);
        });
    });
  };
};
