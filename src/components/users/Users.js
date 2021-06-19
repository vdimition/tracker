import React, { useEffect, useState } from 'react';
import { addUser, deleteUser, fetchUsersRead } from "../../store/ducks/users";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";

const Users = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [params, setParams] = useState()
  const [id, setId] = useState()

  const { dataUsersRead } = useSelector(state => state.usersRead)
  const [filteredUsers, setFilteredUsers] = useState([])

  const [name, setName] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    dispatch(fetchUsersRead())
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
    if (dataUsersRead) {
      if (id) {
        setFilteredUsers(dataUsersRead.filter((user) => +user.id === +id))
      } else {
        setFilteredUsers(dataUsersRead)
      }
    }
  }, [id, dataUsersRead])

  const submit = (e) => {
    e.preventDefault()

    if (name && email) {
      dispatch(addUser({ name, email }))
    }
  }

  return (
    <>
      <div>
        {!id ? (
          <>
            <div>
              <form onSubmit={submit}>
                <label>
                  <div>Name</div>
                  <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                </label>
                <label>
                  <div>Email</div>
                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </label>
                <br/>
                <br/>
                <button>Add New</button>
              </form>
            </div>
            <br/>
            <hr/>
            <br/>
          </>
        ) : ''}
        {filteredUsers?.length ? (
          <div>
            <h3>User List</h3>
            {filteredUsers.map(({ id, name, email }) => (
              <div key={id}>
                <div>{name}</div>
                <div>{email}</div>
                <button onClick={() => dispatch(deleteUser(id))}>Delete</button>
                <br/>
                <br/>
              </div>
            ))}
          </div>
        ) : ''}
      </div>
    </>
  );
}

export default Users;
