const actions = {
  READ_PROJECTS_SUCCESS: 'READ_PROJECTS_SUCCESS',

  ADD_PROJECT: 'ADD_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

const initialState = {
  dataProjectsRead: [],
}

export const projectsReadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_PROJECT:
      return {
        dataProjectsRead: [...state.dataProjectsRead, { ...payload, id: state.dataProjectsRead.length + 1 }]
      }
    case actions.DELETE_PROJECT:
      return {
        dataProjectsRead: state.dataProjectsRead.filter(project => project.id !== payload)
      }

    case actions.READ_PROJECTS_SUCCESS:
      return {
        dataProjectsRead: payload
      }

    default:
      return state
  }
}

export const deleteProject = (payload) => {
  const localStorageProjects = localStorage.getItem('tracker_projects')

  if (localStorageProjects) {
    localStorage.setItem(
      'tracker_projects',
      JSON.stringify(JSON.parse(localStorageProjects).filter(({ id }) => id !== payload))
    )
  }

  return { type: actions.DELETE_PROJECT, payload }
}

export const addProject = (payload) => {
  const localStorageProjects = localStorage.getItem('tracker_projects')

  if (localStorageProjects) {
    localStorage.setItem(
      'tracker_projects',
      JSON.stringify([
        ...JSON.parse(localStorageProjects),
        { id: JSON.parse(localStorageProjects).length + 1, ...payload }
      ])
    )
  } else {
    localStorage.setItem('tracker_projects', JSON.stringify([{ id: 1, ...payload }]))
  }

  return { type: actions.ADD_PROJECT, payload }
}

export const fetchProjectsRead = () => (dispatch) => {
  const localStorageProjects = localStorage.getItem('tracker_projects')

  if (localStorageProjects) {
    dispatch({ type: actions.READ_PROJECTS_SUCCESS, payload: JSON.parse(localStorageProjects) })
  } else {
    const data = [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' },
      { id: 3, name: 'Project 3' },
    ]
    dispatch({ type: actions.READ_PROJECTS_SUCCESS, payload: data })
    localStorage.setItem('tracker_projects', JSON.stringify(data))
  }
}