import React from 'react';
import Pagination from "react-js-pagination";

const PaginationKomponent = (props) => {
  const handlePageChange = (pageNumber) => {
    props.SetParameter({...props.Parameter, page : pageNumber});
  };
  return (
    <Pagination
      activePage={props.CurrentPage}
      itemsCountPerPage={props.PerPage}
      totalItemsCount={props.TotalPage}
      pageRangeDisplayed={5}
      onChange={handlePageChange.bind(this)}
      itemClass="page-item"
      linkClass="page-link"
    />
  )
};

const PaginationManual = React.memo(PaginationKomponent);
export default PaginationManual;
