import axios from 'axios'
import {ErrorApi} from "../../../../containers/Konfig/HandleError/ErrorApi";


export const CobaLogin = (Form, dispatch, history, setLoading) => {
  setLoading(true);
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BASE_URL}/api/login`,
    data: Form,
    config: { headers: {
        'Accept': 'application/json'
      }}
  })
    .then(res => {
      setLoading(false);
      localStorage.setItem('login', true);
      localStorage.setItem('user', JSON.stringify(res.data.success));
      localStorage.setItem('instansi', JSON.stringify(res.data.instansi));
      console.log('sukses');
      history.push('/')
    })
    .catch(function (error) {
      setLoading(false);
      ErrorApi(error, dispatch);
    });
};
