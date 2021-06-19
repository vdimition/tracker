import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, deleteProject, fetchProjectsRead } from "../../store/ducks/projects";

const Projects = () => {
  const dispatch = useDispatch();

  const { dataProjectsRead } = useSelector(state => state.projectsRead)

  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(fetchProjectsRead())
  }, [])

  const submit = (e) => {
    e.preventDefault()

    if (name) {
      dispatch(addProject({ name }))
      setName('')
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={submit}>
          <label>
            <div>Name:</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <br/>
          <br/>
          <button type={'submit'}>Add New</button>
        </form>
      </div>
      <br/>
      <hr/>
      <br/>
      {dataProjectsRead?.length ? dataProjectsRead.map(({ id, name }) => (
        <div key={id}>
          <div>{name}</div>
          <button onClick={() => dispatch(deleteProject(id))}>Delete</button>
          <br/>
          <br/>
        </div>
      )) : ''}
    </div>
  );
}

export default Projects;
