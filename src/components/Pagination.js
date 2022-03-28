import React from 'react';

const Pagination = ({studentsPerPage, totalStudents}) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(totalStudents/studentsPerPage); i++){
    pageNumbers.push(i);
  }
  console.log(pageNumbers)
  return(
      <ul>
        {pageNumbers.map(page => {
          <li key={page} className='page-item'>
            <a onClick={(page) => paginate(page)} href='!#' className='page-link'>{page}</a>
          </li>
        })}
      </ul>
  )
}

export default Pagination