import React from 'react';
import * as moment from 'moment';
import {Table} from "reactstrap";
import styled from "styled-components";

const TextTable = styled.p`
  font-size: 12px;
  margin-bottom: 0;
  `;

const TableDataKomponent = (props) => {
  const BanyakData = props.DataTable.length;

  return (
    <Table hover responsive className="table-outline mb-0 d-sm-table table-bordered">
      <thead className="thead-light">
      <tr>
        <th width="5%" className="text-center">No.</th>
        <th className="text-center">Asal Surat</th>
        <th width="18%" className="text-center">No & Tgl. Surat</th>
        <th className="text-center">Tgl. Masuk</th>
        <th width="30%" className="text-center d-md-down-none">Perihal</th>
        <th className="text-center">Disposisi</th>
        <th className="text-center">Detil</th>
      </tr>
      </thead>
      <tbody>
      {
        props.Loading ?
          <tr>
            <td className="text-center" colSpan={7}>
              ... Loading
            </td>
          </tr>
          :
          BanyakData !== 0 ?
            props.DataTable.map((data)=>
              <tr key={data.id}>
                <td className="text-center">
                  <TextTable>{data.nomor_agenda}</TextTable>
                </td>
                <td className="text-center"><TextTable>{data.asal_surat}</TextTable></td>
                <td className="text-center"><TextTable>{data.nomor_surat}</TextTable>
                  <TextTable className="small text-muted">
                    {moment(data.tanggal_surat).locale('id').format('dddd, DD MMMM YYYY')}
                  </TextTable>
                </td>
                <td className="text-center"><TextTable>{moment(data.tanggal_terima).locale('id').format('dddd, DD MMMM YYYY')}</TextTable></td>
                <td className='d-md-down-none'><TextTable>{data.perihal}</TextTable></td>
                <td className="text-center">
                  {data.disposisi === null ? <TextTable>Belum Terdisposisi</TextTable> :
                    <React.Fragment>
                      <TextTable>{data.nomor_surat}</TextTable>
                      <TextTable className="small text-muted">
                        {moment(data.tanggal_surat).locale('id').format('DD MMMM YYYY')}</TextTable>
                    </React.Fragment>
                  }
                </td>
                <td className='text-center'>Lihat</td>
              </tr>
            ) :
            <tr>
              <td className="text-center" colSpan={7}>
                Tidak Ada Data
              </td>
            </tr>
      }
      </tbody>
    </Table>
  )
};

const TableData = React.memo(TableDataKomponent);
export default TableData;
