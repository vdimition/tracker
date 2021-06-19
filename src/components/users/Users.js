import React, { useEffect } from 'react';
import { fetchUsersRead } from "../../store/ducks/users";
import { useDispatch, useSelector } from 'react-redux';
import Menu from "../menu/menu";

const Users = () => {
  const dispatch = useDispatch();

  const { dataUsersRead } = useSelector(state => state.usersRead)

  useEffect(() => {
    dispatch(fetchUsersRead())
  }, [])

  useEffect(() => {
    console.log(dataUsersRead)
  }, [dataUsersRead])

  return (
    <>
      <Menu/>
      <div>
        {dataUsersRead?.map(({ id, name, email, phone, }) => (
          <>
            <div key={id}>
              <div>{name}</div>
              <div>{email}</div>
              <div>{phone}</div>
            </div>
            <br/>
            <br/>
          </>
        ))}
      </div>
    </>
  );
}

export default Users;
