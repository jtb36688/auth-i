import React from "react";
import User from "./User";

const Users = props => {
  return (
    <div className="UsersContainer">
      <h2>Users List</h2>
      <ul className="UsersList">
        {props.usersarray.map(user => {
          return (
            <li>
              <User
                username={user.username}
                password={user.password}
                key={user.password}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
