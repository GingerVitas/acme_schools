import React from 'react';
import {Pagination} from "react-bootstrap";

const StudentPagination = ({studentsPerPage, totalModifiedStudents, setCurrentPage, currentPage}) => {
  const pages = [];
  const totalPages = Math.ceil(totalModifiedStudents / studentsPerPage)
  const createPaginationItem = (i) => {
    return <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
        href={`/#/students?page=${i}`}
      >
        {i}
      </Pagination.Item>
  }
  pages.push(createPaginationItem(1))
  pages.push(<Pagination.Ellipsis />);
  const midpoint = totalPages/2;
  for (let i = midpoint; i <= midpoint + 4; i++) {
    pages.push(createPaginationItem(i));
  }
  pages.push(<Pagination.Ellipsis />);
  pages.push(createPaginationItem(totalPages));

  return(
    <Pagination className="paginationInfo">
      <Pagination.Prev
        onClick={() => setCurrentPage(currentPage - 1)}
        href={`/#/students?page=${currentPage -1}`}
        disabled={currentPage === 1}
      />
      {pages}
      <Pagination.Next
        onClick={() => setCurrentPage(currentPage + 1)}
        href={`/#/students?page=${currentPage +1}`}
        disabled={currentPage === totalPages}
      />
    </Pagination>

  )
}

export default StudentPagination
