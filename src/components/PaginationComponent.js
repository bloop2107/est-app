import React, {useState} from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = (props) => {
  const {pagination, onPageChange} = props;
  const {page,limit,totalRows,pageLimit} = pagination;

  const totalPage = Math.ceil(totalRows / limit);

  const [pages] = useState(totalPage)
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    const page_no = currentPage + 1;
    setCurrentPage(page_no);
    if(onPageChange){
      onPageChange(page_no);
    }
  }

  function goToPrevPage() {
    const page_no = currentPage - 1;
    setCurrentPage(page_no);
    if(onPageChange){
      onPageChange(page_no);
    }
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    if(onPageChange){
      onPageChange(pageNumber);
    }
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * limit - limit;
    const endIndex = startIndex + limit;
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit)  * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const debug = getPaginationGroup();


  return (
    <Pagination className="p-0">
        <Pagination.Prev disabled={page <= 1} onClick = {goToPrevPage} />
        {getPaginationGroup().map((item, index) => (
          <Pagination.Item 
            key={index} 
            onClick = {changePage}
            className = {(currentPage === item) ? 'active' : 'disbled'}
          >
            {item}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page >= totalPage} onClick = {goToNextPage} />
    </Pagination>
  );
};

export default PaginationComponent;
