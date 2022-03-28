import React from 'react';

const Pagination = ({studentsPerPage, totalModifiedStudents, paginate}) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(totalModifiedStudents/studentsPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    <nav>
      <ul>
        {pageNumbers.map(page => {
          return(
            <li key={page} className='page-item'>
            <a onClick={() => paginate(page)} href={`#/students?page=${page}`} className='page-link'>{page}</a>
          </li>
          )
        })}
      </ul> 
    </nav>

  )
}

export default Pagination
