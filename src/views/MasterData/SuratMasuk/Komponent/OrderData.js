import React from "react";
import {Col, FormGroup} from "reactstrap";
import {Select, MenuItem} from '@material-ui/core';

const OrderDataKomponent = ({Parameter, SetParameter}) => {
  return(
    <FormGroup row>
      <Col xs="12" md="12">
        <Select value={Parameter.orderfield} onChange={(e) => SetParameter({...Parameter, orderfield: e.target.value})} name="order_field" id="order_field" inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value="nomor_agenda">Nomor Agenda</MenuItem>
          <MenuItem value="tanggal_surat">Tanggal Surat</MenuItem>
          <MenuItem value="tanggal_terima">Tanggal Terima</MenuItem>
        </Select>
        <Select value={Parameter.orderby} onChange={(e) => SetParameter({...Parameter, orderby: e.target.value})} name="order_by" id="order_by" inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value="asc">Terendah</MenuItem>
          <MenuItem value="desc">Tertinggi</MenuItem>
        </Select>
      </Col>
    </FormGroup>
  )
}

const OrderData = React.memo(OrderDataKomponent);
export default OrderData;
