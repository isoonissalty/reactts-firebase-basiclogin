import React from 'react'
import { TextField } from './components/TextField'
import { Typography } from '@material-ui/core'

interface User {
  uid: string;
  username: string;
  email: string;
  role: string;
}

interface ProfilePayload {
  name: string;
  value: string;
}

interface Props {
  user: User;
  onChangeProfile: (payload: ProfilePayload) => void;
}

export const Profile: React.FC<Props> = ({ user, onChangeProfile }) => {
  return (
    <div style={{margin: 35}}>
      <Typography>Welcom {user.username}</Typography>
      <div>
        <TextField name="email" value={user.email} onChange={(e) => onChangeProfile({ name: e.target.name, value: e.target.value })} disabled={true} />
      </div>
      <div>
        <TextField name="username" value={user.username} onChange={(e) => onChangeProfile({ name: e.target.name, value: e.target.value })} />
      </div>
    </div>
  );
}