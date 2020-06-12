import {createFilterOptions} from "@material-ui/lab/";
import * as AutoCompleteHelpers from '../Helper/AutoCompleteHelpers';
import axios from 'axios';
const filter = createFilterOptions();

export const getOptionLabel = (option, SetKategoriSurat) => {
  const User = JSON.parse(localStorage.getItem('user'));
  // Value selected with enter, right from the input
  if (typeof option === 'string') {
    return option;
  }
  // Untuk Menambahkan Kode Surat.............................
  if (option.inputValue) {
    let DataForm = {
      nama : option.inputValue
    };
    axios({
      method : 'post',
      url : `${process.env.REACT_APP_BASE_URL}/api/kategori-surat`,
      data: DataForm,
      headers: {
        Accept: 'application/json',
        Authorization : 'Bearer '.concat(User.token)
      }
    }).then(res => {
      AutoCompleteHelpers.GetAutoComplete2(SetKategoriSurat);
    })
    return option.inputValue;
  }
  // Regular option
  return option.nama;
}

export const filterOptions = (options, params) => {

  const filtered = filter(options, params);

  // Suggest the creation of a new value
  if (params.inputValue !== '') {
    filtered.push({
      inputValue: params.inputValue,
      nama: `Tambahkan "${params.inputValue}"`,
    });
  }

  return filtered;
};
