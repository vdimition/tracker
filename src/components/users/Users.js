import React, { useEffect, useState } from 'react';
import { addUser, deleteUser, fetchUsersRead } from "../../store/ducks/users";
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const dispatch = useDispatch();

  const { dataUsersRead } = useSelector(state => state.usersRead)

  const [name, setName] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    if (!dataUsersRead) {
      dispatch(fetchUsersRead())
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()

    if (name && email) {
      dispatch(addUser({ name, email }))
    }
  }

  return (
    <>
      <div>
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
        <div>
          <h3>User List</h3>
          {dataUsersRead?.map(({ id, name, email }) => (
            <div key={id}>
              <div>{name}</div>
              <div>{email}</div>
              <button onClick={() => dispatch(deleteUser(id))}>Delete</button>
              <br/>
              <br/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Users;
