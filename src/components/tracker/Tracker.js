import React, { useEffect, useState } from 'react';
import { fetchUsersRead } from "../../store/ducks/users";
import { useDispatch, useSelector } from 'react-redux';
import Menu from "../menu/menu";
import ReactSelect from 'react-select';
import { filterOption } from "../../utils";

const Tracker = () => {
  const dispatch = useDispatch();

  const { dataUsersRead, loadingUsersRead } = useSelector(state => state.usersRead)
  const { dataProjectsRead } = useSelector(state => state.projectsRead)


  const [userOptions, setUserOptions] = useState([])
  const [user, setUser] = useState({ value: '', label: 'User Name' })

  const [projectOptions, setProjectOptions] = useState([])
  const [project, setProject] = useState({ value: '', label: 'Project Name' })

  const [honours, setHonours] = useState();

  useEffect(() => {
    dispatch(fetchUsersRead())
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

  const submit = () => {

  }

  return (
    <>
      <Menu/>
      <br/>
      <br/>
      <form onSubmit={submit}>
        <label>
          <div>Select User</div>
          <ReactSelect
            isDisabled={loadingUsersRead}
            classNamePrefix="react-select"
            onChange={(e) => setUser(e.id)}
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
            onChange={(e) => setProject(e.id)}
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
            onChange={(e) => setHonours(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}

export default Tracker;
