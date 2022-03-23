import axios from 'axios';

const LOAD_STUDENTS = 'LOAD_STUDENTS'

//Action Creators
const _loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students
  }
}

//Thunks
export const loadStudents = () => {
  return async(dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_loadStudents(students))
  }
}


const studentReducer = (state =[], action) => {
  if(action.type === LOAD_STUDENTS){
    return action.students;
  }
  return state;
}


export default studentReducer;