
export const ErrorApi = (error, dispatch) => {
  if (error.message === 'Network Error') {
    dispatch({type : 'MODAL_ERROR', status : '404', message : error.message})
  }else{
    if (error.response) {
      dispatch({type : 'MODAL_ERROR', status : error.response.status, message : error.response.data.message})
    } else if (error.request) {
      dispatch({type : 'MODAL_ERROR', status : error.response.status, message : error.message})
    }
    else {
      dispatch({type : 'MODAL_ERROR', status : 'Nan', message : error.message})
    }
  }
}
