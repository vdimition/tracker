import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject } from "../../store/ducks/projects";
import Menu from "../menu/menu";

const Projects = () => {
  const dispatch = useDispatch();

  const { dataProjectsRead } = useSelector(state => state.projectsRead)

  return (
    <>
      <Menu/>
      <div>
        {dataProjectsRead?.length ? dataProjectsRead.map(({ id, name }) => (
          <div key={id}>
            <h3>{name}</h3>
            <button onClick={() => dispatch(deleteProject(id))}>Delete</button>
          </div>
        )) : (
          <div>
            <h3>No Project Found.</h3>
            <div>
              <button>Add New</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Projects;
