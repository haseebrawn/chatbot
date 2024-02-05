import React from 'react';

const UserStatus = ({LoggedIn, active}) => {
  return (
    <div className="user-status">
    {LoggedIn ? <>
    </>
    :
    ''
    }
      <span className={`dot ${active ? 'active' : 'inactive'}`}></span>
      <span className="status-text">{active ? 'Active Now' : 'Inactive'}</span>
    </div>
  );
};

export default UserStatus;
