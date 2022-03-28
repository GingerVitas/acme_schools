import React from 'react';

const CampusesNav = ({sortHandler, filterHandler}) => {
  return(
    <ul>
            <li>
              Sort
              <ul>
                <li className='link'><button onClick={()=> sortHandler('')}>Default Order</button></li>
                <li className='link'><button onClick={()=> sortHandler('enrolledDescending')}>Enrolled Students (Descending)</button></li>
                <li className='link'><button onClick={()=> sortHandler('enrolledAscending')}>Enrolled Students (Ascending)</button></li>
              </ul>
            </li>
            <li>
              Filter
              <ul>
               <li className='link'><button onClick={()=> filterHandler('')}>All Campuses</button></li>
               <li className='link'><button onClick={()=> filterHandler('emptyCampuses')}>No Enrolled Students</button></li>
              </ul>
            </li>
          </ul>
  )
}

export default CampusesNav;