import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { addProject, deleteProject, fetchProjectsRead } from "../../store/ducks/projects";

const Projects = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { dataProjectsRead } = useSelector(state => state.projectsRead)

  const [name, setName] = useState('')
  const [filteredProjects, setFilteredProjects] = useState([])

  const [params, setParams] = useState()
  const [id, setId] = useState()

  useEffect(() => {
    dispatch(fetchProjectsRead())
  }, [])

  useEffect(() => {
    setParams(new URLSearchParams(location.search))
  }, [location])

  useEffect(() => {
    if (params) {
      setId(params.get('id'))
    }
  }, [params])

  useEffect(() => {
    if (dataProjectsRead) {
      if (id) {
        setFilteredProjects(dataProjectsRead.filter((user) => +user.id === +id))
      } else {
        setFilteredProjects(dataProjectsRead)
      }
    }
  }, [id, dataProjectsRead])

  useEffect(() => {
    if (dataProjectsRead) {
      if (id) {
        setFilteredProjects(dataProjectsRead.filter((project) => +project.id === +id))
      } else {
        setFilteredProjects(dataProjectsRead)
      }
    }
  }, [id, dataProjectsRead])

  const submit = (e) => {
    e.preventDefault()

    if (name) {
      dispatch(addProject({ name }))
      setName('')
    }
  }

  return (
    <div>
      {!id ? (
        <>
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
        </>
      ) : ''}
      {filteredProjects?.length ? filteredProjects.map(({ id, name }) => (
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
