const actions = {
  READ_USERS_REQUEST: 'READ_USERS_REQUEST',
  READ_USERS_SUCCESS: 'READ_USERS_SUCCESS',
  READ_USERS_FAILURE: 'READ_USERS_FAILURE',

  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
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

    case actions.ADD_USER:
      return {
        ...state,
        dataUsersRead: [...state.dataUsersRead, { id: state.dataUsersRead.length + 1, ...payload }]
      }
    case actions.DELETE_USER:
      return {
        ...state,
        dataUsersRead: state.dataUsersRead.filter(({ id }) => id !== payload)
      }

    default:
      return state
  }
}

export const fetchUsersRead = () => (dispatch) => {
  dispatch({ type: actions.READ_USERS_REQUEST })

  const localStorageUsers = localStorage.getItem('tracker_users')

  if (localStorageUsers) {
    dispatch({ type: actions.READ_USERS_SUCCESS, payload: JSON.parse(localStorageUsers) })
  } else {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: actions.READ_USERS_SUCCESS, payload: data })

        localStorage.setItem('tracker_users', JSON.stringify(data))
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: actions.READ_USERS_FAILURE, payload: error })
      });
  }
}

export const addUser = (payload) => {
  const localStorageUsers = localStorage.getItem('tracker_users')

  if (localStorageUsers) {
    localStorage.setItem(
      'tracker_users',
      JSON.stringify([
        ...JSON.parse(localStorageUsers),
        { id: JSON.parse(localStorageUsers).length + 1, ...payload }
      ])
    )
  } else {
    localStorage.setItem('tracker_users', JSON.stringify([{ id: 1, ...payload }]))
  }

  return { type: actions.ADD_USER, payload }
}

export const deleteUser = (payload) => {
  const localStorageUsers = localStorage.getItem('tracker_users')

  if (localStorageUsers) {
    localStorage.setItem(
      'tracker_users',
      JSON.stringify(JSON.parse(localStorageUsers).filter(({id}) => id !== payload))
    )
  }

  return { type: actions.DELETE_USER, payload }
}