import React from 'react';

const StudentNav = ({campuses, sortHandler, filterHandler}) => {

  return(
    <ul>
      <li>
        Sort
        <ul>
          <li><button onClick={()=> sortHandler('')}>Default Order</button></li>
          <li><button onClick={()=>sortHandler('lastNameAscending')}>Last Name Ascending</button></li>
          <li><button onClick={()=>sortHandler('lastNameDescending')}>Last Name Descending</button></li>
          <li><button onClick={()=>sortHandler('GPADescending')}>GPA Descending</button></li>
          <li><button onClick={()=>sortHandler('GPAAscending')}>GPA Ascending</button></li>
        </ul>
      </li>
      <li>
        Filter
        <ul>
          <li><button onClick={()=>filterHandler('')}>All Students</button></li>
          <li><button onClick={()=>filterHandler('unenrolled')}>Unenrolled Students</button></li>
          <li>
            Campuses
            <ul>
            {campuses.map(campus => {
              return(
                <li key={campus.id}><button onClick={()=>filterHandler(`${campus.name}`)}>{campus.name}</button></li>
              )
            })
              }
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default StudentNav;



