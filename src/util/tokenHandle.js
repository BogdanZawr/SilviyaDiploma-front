import q from 'q';
import axios from 'axios';

import store from '../store';
import { refreshToken, dropToken, dropUser, setToken } from '../action/auth';

const tokenHandle = ({ method, url, headers = {}, data = {}, config = {} }) => {
  const deferred = q.defer();

  const auth = store.getState().auth;

  if (auth.token && auth.token.accessToken) {
    headers.Authorization = `Bearer ${auth.token.accessToken}`;
  }

  axios({ method, url, headers, data, config })
    .then(res => {
      deferred.resolve(res)
    })
    .catch(err => {
      const check = err.response.data.some(el => el.param === 'accessToken');

      if (!check) {
        deferred.reject(err);
        return;
      }

      store.dispatch(refreshToken())
        .then(res => {
          store.dispatch(setToken(res.data));
          headers.Authorization = `Bearer ${auth.token.accessToken}`;

          axios({ method, url, headers, data, config })
            .then(res => {
              deferred.resolve(res)
            })
            .catch((err) => {
              deferred.reject(err)
            })
        })
        .catch(() => {
          store.dispatch(dropToken());
          store.dispatch(dropUser());


          deferred.reject(err)
        })
    });

  return deferred.promise
};

export default tokenHandle;
