import axios from 'axios';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';

//Action Creators
const _loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students
  }
}

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  }
}

const _addStudent = (student) => {
  return {
    type: ADD_STUDENT,
    student
  }
}

//Thunks
export const loadStudents = () => {
  return async(dispatch) => {
    const students = (await axios.get('/api/students')).data;
    dispatch(_loadStudents(students))
  }
};

export const updateStudent = (student, history) => {
  return async(dispatch) => {
    const updatedStudent = (await axios.put(`/api/students/${student.id}`, student)).data;
    dispatch(_updateStudent(updatedStudent));
    history.push(`/students/`)
  }
};

export const addStudent = (student, history) => {
  return async(dispatch) => {
    const newStudent = (await axios.post('/api/students', student)).data;
    dispatch(_addStudent(newStudent));
    history.push(`/students/${newStudent.id}`)
  }
};

const studentReducer = (state =[], action) => {
  if(action.type === LOAD_STUDENTS){
    return action.students;
  }
  if(action.type === UPDATE_STUDENT){
    return [...state.map(student => student.id !== action.student.id ? student : action.student)]
  }
  if(action.type === ADD_STUDENT){
    return [...state, action.student]
  }
  return state;
}


export default studentReducer;