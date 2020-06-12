import React, {useEffect, useState} from 'react';
import * as moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab/";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Button2 from "@material-ui/core/Button";
import {Container, Row, Col} from "reactstrap/es";
import * as NomorAgendaHelpers from '../Helper/NomorAgendaHelper';
import * as AutoCompleteHelpers from '../Helper/AutoCompleteHelpers';
import * as KodeSuratHelper from '../Helper/KodeSuratHelpers'
import * as AddData from '../Helper/AddData';


const ModalTambahKomponent = (props) => {
  const [ModalTambah, SetModalTambah] = useState(false);
  const toggleLarge = () => {
    SetModalTambah(!ModalTambah);
  };

  const [Form, SetForm] = useState({
    tanggal_surat : moment().format('YYYY-MM-DD'),
    tanggal_terima : moment().format('YYYY-MM-DD'),
    asal_surat : '',
    nomor_agenda : '',
    kode_surat : '',
    tingkat_keamanan : 3,
    nomor_surat : '',
    perihal_surat : '',
    keterangan : ''
  });

  const [kategori_surat, set_kategori_surat] = useState(null)

  const [Error, SetError] = useState({
    error_tanggal : false,
    error_nomor_agenda : false
  });

  const ValidasiKarakter = (e, parameter) => {
    const filteredInput = e.target.value.replace(/[$&_^}{*'@#%]/, '');
    if(parameter === 'perihal_surat'){
      SetForm({...Form, perihal_surat: filteredInput})
    }
    else{
      SetForm({...Form, keterangan: filteredInput})
    }

  };

  const ValidasiNomor = (e) => {
    const filteredInput = e.target.value.replace(/^[A-Za-z]+$/, '');
    SetForm({...Form, nomor_agenda: filteredInput})
  };


  const ValidasiTgl = (TglMasuk, TglSurat, Parameter) => {
    if(moment(TglSurat).format('YYYY-MM-DD') > moment(TglMasuk).format('YYYY-MM-DD')){
      SetError({...Error, error_tanggal: true})
    }else{
      SetError({...Error, error_tanggal: false})
    }
  };

  const [NamaPA, SetNamaPA] = useState([{asal_surat : '...Loading'}]);
  const [KodeSurat, SetKodeSurat] = useState([{kode_surat : '...Loading'}]);
  const [KategoriSurat, SetKategoriSurat] = useState([]);
  const [NomorSurat, SetNomorSurat] = useState([{nomor_surat: '...Loading'}]);

  const [SaranNomorAgenda, SetSaranNomorAgenda] = useState(null);

  const FocusKategoriSsurat = () => {
    AutoCompleteHelpers.GetAutoComplete2(SetKategoriSurat);
  };


  useEffect(() => {
    NomorAgendaHelpers.SaranNomorAgenda(moment(Form.tanggal_terima).format('YYYY'), SetSaranNomorAgenda);
  },[Form.tanggal_terima]);


  const FocusNamaPA = () => {
    AutoCompleteHelpers.GetAutoComplete(SetNamaPA, 'asal_surat');
  };

  const FocusKodeSurat = () => {
    AutoCompleteHelpers.GetAutoComplete(SetKodeSurat, 'kode_surat');
  };

  const GenerateNomorSurat = () => {
    AutoCompleteHelpers.GetNomorSurat(Form, SetNomorSurat);
  };

  const CekNomorAgenda = () => {
    NomorAgendaHelpers.CekNomorAgenda(Form, moment(Form.tanggal_terima).format('YYYY'), Error, SetError)
  }

  const HandleKodeSurat = (event, newValue) => {

    if (typeof newValue === 'string') {
      set_kategori_surat({
        kategori_surat: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      set_kategori_surat({
        nama: newValue.inputValue,
      });
    } else {
      set_kategori_surat(newValue);
    }
  }

  return (
    <React.Fragment>
      <Button2 onClick={toggleLarge} className='ml-2 mr-2 float-right' size={"small"} variant="contained">Tambah</Button2>
      <Modal isOpen={ModalTambah} toggle={toggleLarge} className={'modal-lg modal-success'}>
        <ModalHeader toggle={toggleLarge}>Tambah Data Surat Masuk</ModalHeader>
        <ModalBody>
          <Container fluid={true}>
            <Row>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Col md={6}>
                  <DatePicker name='tanggal_surat' label='Tanggal Surat' fullWidth autoOk
                              onChange={e => {
                                SetForm({...Form, tanggal_surat: e});
                                ValidasiTgl(Form.tanggal_terima, e, 'tanggal_surat')
                              }}
                              value={Form.tanggal_surat} format="dddd, DD MMMM YYYY"
                              error={Error.error_tanggal}
                              helperText={Error.error_tanggal ? 'Tanggal Surat tidak boleh lebih dari Tanggal Masuk' : null}
                  />
                </Col>
                <Col md={6}>
                  <DatePicker name='tanggal_terima' label='Tanggal Terima Surat' fullWidth autoOk
                              onChange={e => {
                                SetForm({...Form, tanggal_terima: e});
                                ValidasiTgl(e, Form.tanggal_surat, 'tanggal_masuk')
                              }}
                              value={Form.tanggal_terima} format="dddd, DD MMMM YYYY"
                              error={Error.error_tanggal}
                              helperText={Error.error_tanggal ? 'Tanggal Masuk tidak boleh kurang dari Tanggal Surat' : null}
                  />
                </Col>
              </MuiPickersUtilsProvider>
            </Row>
            <Row>
              <Col md={6}>
                <Autocomplete
                  id="asal_surat"
                  name="asal_surat"
                  freeSolo
                  onFocus={FocusNamaPA}
                  onChange={(e) => SetForm({...Form, asal_surat: e.target.value})}
                  onSelect={(e) => SetForm({...Form, asal_surat: e.target.value})}
                  options={NamaPA.map((option) => option.asal_surat)}
                  renderInput={(params) => (
                    <TextField {...params}
                               label="Asal Surat"
                               placeholder="Isi/Pilih Asal Surat yang tersedia"
                               margin="normal"
                               InputLabelProps={{
                                 shrink: true,
                               }}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <TextField label={
                            Error.error_nomor_agenda ? "Nomor Agenda Surat Masuk #Error#" : "Nomor Agenda Surat Masuk"
                          }
                           onFocus={() => SetError({...Error, error_nomor_agenda: false})}
                           helperText={
                             Error.error_nomor_agenda ? "Nomor Agenda Sudah Ada" : null
                           }
                           placeholder={SaranNomorAgenda}
                           value={Form.nomor_agenda}
                           onChange={(e) => ValidasiNomor(e)}
                           onBlur={CekNomorAgenda}
                           margin="normal"
                           error={Error.error_nomor_agenda}
                           fullWidth
                           InputLabelProps={{
                             shrink: true,
                           }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Autocomplete
                  id="kode_surat"
                  name="kode_surat"
                  freeSolo
                  onFocus={FocusKodeSurat}
                  onChange={(e) => SetForm({...Form, kode_surat: e.target.value})}
                  onSelect={(e) => SetForm({...Form, kode_surat: e.target.value})}
                  options={KodeSurat.map((option) => option.kode_surat)}
                  renderInput={(params) => (
                    <TextField {...params}
                               label="Kode Surat"
                               placeholder="Pilih Asal Kode Surat yang tersedia"
                               margin="normal"
                               InputLabelProps={{
                                 shrink: true,
                               }}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <Autocomplete
                  onFocus={FocusKategoriSsurat}
                  value={kategori_surat}
                  onChange={(event, newValue) =>
                    HandleKodeSurat(event, newValue)
                  }
                  filterOptions={(options, params) =>
                    KodeSuratHelper.filterOptions(options, params)
                  }
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={KategoriSurat}
                  getOptionLabel={(option) =>
                    KodeSuratHelper.getOptionLabel(option, SetKategoriSurat)
                  }
                  renderOption={(option) => option.nama}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params}
                               label="Kategori Surat"
                               placeholder="Pilih Kategori Surat yang tersedia"
                               margin="normal"
                               InputLabelProps={{
                                 shrink: true,
                               }}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Autocomplete
                  id="nomor_surat"
                  name="nomor_surat"
                  freeSolo
                  onFocus={GenerateNomorSurat}
                  onChange={(e) => SetForm({...Form, nomor_surat: e.target.value})}
                  onSelect={(e) => SetForm({...Form, nomor_surat: e.target.value})}
                  options={NomorSurat.map((option) => option.nomor_surat)}
                  getOptionDisabled={(option) => option === 'Tidak Tersedia Pilihan'}
                  onBlur={() => {SetNomorSurat([{nomor_surat : '...Loading'}])}}
                  renderInput={(params) => (
                    <TextField {...params}
                               label="Nomor Surat Surat"
                               placeholder="Isi/Pilih Asal Surat yang tersedia"
                               margin="normal"
                               InputLabelProps={{
                                 shrink: true,
                               }}
                    />
                  )}
                />
              </Col>
              <Col md={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="demo-simple-select-label">Tingkat Keamanan Surat</InputLabel>
                  <Select
                    value={Form.tingkat_keamanan}
                    onChange={(e) => SetForm({...Form, tingkat_keamanan: e.target.value})}
                  >
                    <MenuItem value={1}>Sangat Rahasia</MenuItem>
                    <MenuItem value={2}>Rahasia</MenuItem>
                    <MenuItem value={3}>Biasa</MenuItem>
                  </Select>
                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <TextField label="Perihal Surat Masuk"
                           value={Form.perihal_surat}
                           onChange={(e) => ValidasiKarakter(e, 'perihal_surat')}
                           placeholder="Perihal Surat Masuk"
                           margin="normal"
                           fullWidth
                           InputLabelProps={{
                             shrink: true,
                           }}
                           multiline
                           rowsMax={10}
                />
              </Col>
              <Col md={6}>
                <TextField label="Keterangan Surat Masuk"
                           value={Form.keterangan}
                           onChange={(e) => ValidasiKarakter(e, 'keterangan')}
                           placeholder="Keterangan Surat Masuk"
                           margin="normal"
                           fullWidth
                           InputLabelProps={{
                             shrink: true,
                           }}
                />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color={Form.asal_surat === '' || Form.nomor_surat === '' || kategori_surat === null || Form.perihal_surat === '' ? 'danger' : 'success'}
                  disabled={Form.asal_surat === '' || Form.nomor_surat === '' || kategori_surat === null || Form.perihal_surat === ''}
                  onClick={() => {AddData.AddData(Form, kategori_surat)}}>Tambah Data</Button>{' '}
          <Button color="warning" onClick={toggleLarge}>Batalkan</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}
const ModalTambah = React.memo(ModalTambahKomponent);
export default ModalTambah;
