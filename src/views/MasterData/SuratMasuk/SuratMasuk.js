import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {Select, MenuItem} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import * as moment from 'moment';
import axios from 'axios';
import Button2 from "@material-ui/core/Button";
import TableData from "./TableData/TableData";
import CariData from "./Komponent/CariData";
import CardFooter from "reactstrap/es/CardFooter";
import OrderData from "./Komponent/OrderData";
import PaginationManual from "./Komponent/Pagination";
import ModalTambah from "./Komponent/ModalTambah";

const SuratMasuk = () => {

  const [Parameter, SetParameter] = useState({tahun : moment('2020').format('YYYY'), cari : '', isi : '', orderfield : 'nomor_agenda', orderby : 'desc', page: '', tingkat_keamanan : 4});
  const [ButtonCari, SetButtoncari] = useState(false);
  const [LoadTable, SetLoadTable] = useState(false);
  const [Data, SetData] = useState({
    current_page : 0,
    total : 0,
    per_page : 10,
    data : []
  });

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('user'));
    SetLoadTable(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/surat-masuk?page=${Parameter.page}&tahun=${Parameter.tahun}&cari=${Parameter.cari}&isi=${Parameter.isi}&orderfield=${Parameter.orderfield}&orderby=${Parameter.orderby}&tingkat_keamanan=${Parameter.tingkat_keamanan}`,{
      headers: {
        Accept: 'application/json',
        Authorization : `Bearer ${User.token}`
      }}
    )
      .then(res => {
        SetData(res.data);
        SetLoadTable(false);
      })
  },[Parameter]);

  const HandleCari = useCallback((values, type = null) => {
    if(type === 'tutup') {
      SetButtoncari(false);
    }
    SetParameter({...Parameter, cari : values.cari, isi :values.isi, page: 1});
  },[Parameter]);

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
               <Row>
                 <Col md="6" className="d-md-down-none">
                   <MuiPickersUtilsProvider utils={MomentUtils}>
                     <DatePicker autoOk variant="inline"  value={Parameter.tahun} onChange={(e) => SetParameter({...Parameter, tahun : moment(e).format('yyyy')})} views={["year"]} style={{ width : 40 }}/>
                   </MuiPickersUtilsProvider>
                   <Select
                     value={Parameter.tingkat_keamanan} onChange={(e) => SetParameter({...Parameter, tingkat_keamanan: e.target.value})} className="ml-2" displayEmpty inputProps={{ 'aria-label': 'Without label' }} style={{ width : 150 }}>
                     <MenuItem value={4}>Semua Tingkat</MenuItem>
                     <MenuItem value={3}>Biasa</MenuItem>
                     <MenuItem value={2}>Rahasia</MenuItem>
                     <MenuItem value={1}>Sangat Rahasia</MenuItem>
                   </Select>
                 </Col>
                 <Col md="6">
                   { ButtonCari ?
                     <CariData HandleCari={HandleCari}/> :
                     <React.Fragment>
                       <Button2 className='ml-2 float-right' onClick={() => SetButtoncari(true)} size={"small"} variant="contained">Cari Data</Button2>
                       <ModalTambah/>
                     </React.Fragment>
                   }
                 </Col>
               </Row>
              </CardHeader>
              <CardBody>
                <TableData DataTable={Data.data} Loading={LoadTable}/>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col md={6}>
                    <OrderData Parameter={Parameter} SetParameter={SetParameter}/>
                  </Col>
                  <Col md={6}>
                    <div className="float-right">
                      <PaginationManual
                        SetParameter={SetParameter}
                        Parameter={Parameter}
                        CurrentPage={Data.current_page}
                        PerPage={Data.per_page}
                        TotalPage={Data.total}
                      />
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
};

export default SuratMasuk;
