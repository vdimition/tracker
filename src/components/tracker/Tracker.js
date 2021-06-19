import React, { useEffect, useState } from 'react';
import { fetchUsersRead } from "../../store/ducks/users";
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { filterOption } from "../../utils";
import { deleteTime, fetchTimesRead, trackTime } from "../../store/ducks/times";
import { fetchProjectsRead } from "../../store/ducks/projects";
import { NavLink } from "react-router-dom";

const Tracker = () => {
  const dispatch = useDispatch();

  const { times } = useSelector(state => state.times)
  const { dataProjectsRead } = useSelector(state => state.projectsRead)
  const { dataUsersRead, loadingUsersRead } = useSelector(state => state.usersRead)

  const [userOptions, setUserOptions] = useState([])
  const [projectOptions, setProjectOptions] = useState([])

  const [user, setUser] = useState({ value: '', label: 'User Name' })
  const [project, setProject] = useState({ value: '', label: 'Project Name' })
  const [honours, setHonours] = useState();

  useEffect(() => {
    dispatch(fetchUsersRead())
    dispatch(fetchTimesRead())
    dispatch(fetchProjectsRead())
  }, [])

  useEffect(() => {
    if (dataUsersRead) {
      setUserOptions(dataUsersRead.map(({ id, name }) => ({ label: name, value: id })))
    }
  }, [dataUsersRead])

  useEffect(() => {
    if (dataProjectsRead) {
      setProjectOptions(dataProjectsRead.map(({ id, name }) => ({ label: name, value: id })))
    }
  }, [dataProjectsRead])

  const submit = (e) => {
    e.preventDefault()
    if (user.value && project.value && honours) {
      dispatch(trackTime({ userId: user.value, projectId: project.value, honours }))

      setProject({ value: '', label: 'Project Name' })
      setUser({ value: '', label: 'User Name' })
      setHonours('')
    }
  }

  return (
    <>
      <form onSubmit={submit} style={{maxWidth: '500px'}}>
        <label>
          <div>Select User</div>
          <ReactSelect
            isDisabled={loadingUsersRead}
            classNamePrefix="react-select"
            onChange={setUser}
            filterOption={filterOption}
            value={user}
            options={userOptions?.length ? (
              userOptions.sort(({ label: labelA }, { label: labelB }) => {
                if (typeof labelA === 'string' && typeof labelB === 'string') {
                  if (labelA > labelB) {
                    return 1;
                  }
                  if (labelA < labelB) {
                    return -1;
                  }
                }

                return 0;
              })
            ) : []}
          />
        </label>
        <br/>
        <label>
          <div>Select Project</div>
          <ReactSelect
            classNamePrefix="react-select"
            onChange={setProject}
            filterOption={filterOption}
            value={project}
            options={projectOptions?.length ? (
              projectOptions.sort(({ label: labelA }, { label: labelB }) => {
                if (typeof labelA === 'string' && typeof labelB === 'string') {
                  if (labelA > labelB) {
                    return 1;
                  }
                  if (labelA < labelB) {
                    return -1;
                  }
                }

                return 0;
              })
            ) : []}
          />
        </label>
        <br/>
        <label>
          <div>Spend Time</div>
          <input
            type="number"
            value={honours}
            onChange={(e) => {
              setHonours(e.target.value)
            }}
          />
        </label>
        <br/>
        <br/>
        <button type={'submit'}>Submit</button>
      </form>

      <br/>
      <hr/>
      <br/>

      {dataUsersRead && dataProjectsRead && times?.length ? (
        <div>
          <h3>Tracker List</h3>
          {times.map(time => (
            <div key={time.id}>
              <NavLink to={`/users?id=${time.userId}`}>
                User: {dataUsersRead.find(({ id }) => id === time.userId)?.name || time.userId}
              </NavLink>
              <br/>
              <NavLink to={`/projects?id=${time.projectId}`}>
                Project: {dataProjectsRead.find(({ id }) => id === time.projectId)?.name || time.projectId}
              </NavLink>
              <div>
                Spend Time: {time.honours}
              </div>
              <div>
                <button onClick={() => dispatch(deleteTime(time.id))}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : ''}
    </>
  );
}

export default Tracker;
