import axios from "axios";

export const GetAutoComplete = (Set,Param) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-masuk?group_by=${Param}&dipakai_untuk_semua=ya`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      Set(res.data.data)
    });
}


export const GetAutoComplete2 = (Set) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/kategori-surat`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      Set(res.data)
    });
};

export const  GetNomorSurat = (Form, SetNomorSurat) => {
  const User = JSON.parse(localStorage.getItem('user'));
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/generate_nomor_surat?asal_surat=${Form.asal_surat}&tanggal_surat=${Form.tanggal_surat}&kode_surat=${Form.kode_surat}`,{
    headers: {
      Accept: 'application/json',
      Authorization : `Bearer ${User.token}`
    }}
  )
    .then(res => {
      console.log(res)
      if(res.data.status === 'sukses'){
        SetNomorSurat([{nomor_surat : res.data.data}]);
      }else{
        SetNomorSurat([{nomor_surat:  'Tidak Tersedia Pilihan'}])
      }
    });
}


