const actions = {
  READ_TIMES_SUCCESS: 'READ_TIMES_SUCCESS',

  TRACK_TIME: 'TRACK_TIME',
  DELETE_TIME: 'DELETE_TIME',
}

const initialState = {
  times: [],
}

export const timesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.TRACK_TIME:
      return {
        times: [
          ...state.times,
          { id: state.times.length + 1, ...payload }
        ]
      }
    case actions.DELETE_TIME:
      return {
        times: state.times.filter(time => time.id !== payload)
      }

    case actions.READ_TIMES_SUCCESS:
      return {
        times: payload
      }

    default:
      return state
  }
}

export const trackTime = (payload) => {
  const localStorageTimes = localStorage.getItem('tracker_times')

  if (localStorageTimes) {
    localStorage.setItem(
      'tracker_times',
      JSON.stringify([
        ...JSON.parse(localStorageTimes),
        { id: JSON.parse(localStorageTimes).length + 1, ...payload }
      ])
    )
  } else {
    localStorage.setItem('tracker_times', JSON.stringify([{ id: 1, ...payload }]))
  }

  return { type: actions.TRACK_TIME, payload }
}

export const deleteTime = (payload) => {
  const localStorageTimes = localStorage.getItem('tracker_times')

  if (localStorageTimes) {
    localStorage.setItem(
      'tracker_times',
      JSON.stringify(JSON.parse(localStorageTimes).filter(({ id }) => id !== payload))
    )
  }

  return { type: actions.DELETE_TIME, payload }
}

export const fetchTimesRead = () => (dispatch) => {
  const localStorageTimes = localStorage.getItem('tracker_times')

  if (localStorageTimes) {
    dispatch({ type: actions.READ_TIMES_SUCCESS, payload: JSON.parse(localStorageTimes) })
  } else {
    const data = [
      {
        id: 1,
        userId: 1,
        projectId: 1,
        honours: 3
      }
    ]
    dispatch({ type: actions.READ_TIMES_SUCCESS, payload: data })
    localStorage.setItem('tracker_times', JSON.stringify(data))
  }
}