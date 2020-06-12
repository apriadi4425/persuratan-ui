import axios from "axios";

export const AddData = (Form, kategori_surat) => {
  const User = JSON.parse(localStorage.getItem('user'));
  console.log(kategori_surat)

  const HandleForm = {
    tanggal_surat : Form.tanggal_surat,
    tanggal_terima : Form.tanggal_terima,
    asal_surat : Form.asal_surat,
    nomor_agenda : Form.nomor_agenda,
    kode_surat : Form.kode_surat,
    tingkat_keamanan : Form.tingkat_keamanan,
    nomor_surat : Form.nomor_surat,
    perihal : Form.perihal_surat,
    keterangan : Form.keterangan,
    kategori_id : kategori_surat.id
  }

  axios({
    method : 'post',
    url : `${process.env.REACT_APP_BASE_URL}/api/surat-masuk`,
    data: HandleForm,
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }
  }).then(res => {
    console.log('sukses')

  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.data);
  });
}
