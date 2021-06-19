const actions = {
  READ_USERS_REQUEST: 'READ_USERS_REQUEST',
  READ_USERS_SUCCESS: 'READ_USERS_SUCCESS',
  READ_USERS_FAILURE: 'READ_USERS_FAILURE',
}

const initialState = {
  dataUsersRead: null,
  loadingUsersRead: false,
  errorUsersRead: null,
}

export const usersReadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.READ_USERS_REQUEST:
      return {
        ...state,
        loadingUsersRead: true,
        errorUsersRead: null,
      }
    case actions.READ_USERS_SUCCESS:
      return {
        ...state,
        dataUsersRead: payload,
        loadingUsersRead: false,
        errorUsersRead: null,
      }
    case actions.READ_USERS_FAILURE:
      return {
        ...state,
        dataUsersRead: null,
        loadingUsersRead: false,
        errorUsersRead: payload,
      }

    default:
      return state
  }
}

export const fetchUsersRead = () => (dispatch) => {
  dispatch({ type: actions.READ_USERS_REQUEST })

  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: actions.READ_USERS_SUCCESS, payload: data })
    })
    .catch(error => {
      console.error(error)
      dispatch({ type: actions.READ_USERS_FAILURE, payload: error })
    });
}