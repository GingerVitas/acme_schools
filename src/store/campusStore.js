import axios from 'axios';

const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

//Action Creators
export const _loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses
  }
};


//Thunks
export const loadCampuses = () => {
  return async(dispatch) => {
    const campuses = (await axios.get('/api/campuses')).data;
    dispatch(_loadCampuses(campuses));
  }
};


//Reducer
const campusReducer = (state = [],  action) => {
  if(action.type === LOAD_CAMPUSES){
    return action.campuses
  }
  return state
};


export default campusReducer


