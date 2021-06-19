const actions = {
  ADD_PROJECT: 'ADD_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

const initialState = {
  dataProjectsRead: [
    {
      id: 'asdasde3254fasd',
      name: 'Project 1',
    },
    {
      id: 'asdaasdassde3254fasd',
      name: 'Project 2',
    },
    {
      id: 'asdasdwere3254fasd',
      name: 'Project 3',
    },
  ],
}

export const projectsReadReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_PROJECT:
      return {
        dataProjectsRead: [...state.dataProjectsRead, payload]
      }
    case actions.DELETE_PROJECT:
      return {
        dataProjectsRead: state.dataProjectsRead.filter(project => project.id !== payload)
      }

    default:
      return state
  }
}

export const deleteProject = (payload) => ({type: actions.DELETE_PROJECT, payload})