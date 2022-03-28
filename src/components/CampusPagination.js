import React from 'react';

const CampusPagination = ({campusesPerPage, totalModifiedCampuses, paginate}) => {
  const pageNumbers = [];

  for (let i=1; i <= Math.ceil(totalModifiedCampuses/campusesPerPage); i++){
    pageNumbers.push(i);
  }
  return(
    <nav>
      <ul>
        {pageNumbers.map(page => {
          return(
            <li key={page} className='page-item'>
            <a onClick={() => paginate(page)} href={`#/campuses?page=${page}`} className='page-link'>{page}</a>
          </li>
          )
        })}
      </ul> 
    </nav>

  )
}

export default CampusPagination