import axios from 'axios';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const CREATE_CAMPUS = 'CREATE_CAMPUS';

//Action Creators
const _loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses
  }
};

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  }
};

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  }
};


//Thunks
export const loadCampuses = () => {
  return async(dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
  }
};

export const updateCampus = (campus) => {
  return async(dispatch) => {
    const updatedCampus = (await axios.put(`/api/campuses/${campus.id}`, campus)).data;
    dispatch(_updateCampus(updatedCampus));
  }
};

export const createCampus = (campus, history) => {
  return async(dispatch) => {
    const newCampus = (await axios.post('/api/campuses', campus)).data;
    dispatch(_createCampus(newCampus));
  }
};


//Reducer
const campusReducer = (state = [],  action) => {
  if(action.type === LOAD_CAMPUSES){
    return action.campuses
  }
  if(action.type === UPDATE_CAMPUS){
    return [...state.map(campus => campus.id !== action.campus.id ? campus : action.campus)]
  }
  if(action.type === CREATE_CAMPUS){
    return [...state, action.campus]
  }
  return state
};


export default campusReducer


