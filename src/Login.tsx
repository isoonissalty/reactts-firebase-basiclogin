import React from 'react'

import { TextField } from './components/TextField'
import { Button } from './components/Button';

import { Grid, FormControl, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
      margin: theme.spacing(5)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
)

interface Props {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleEmailSignin: () => void;
  handleFacebookSignin: () => void;
  handleGoogleSignin: () => void;
}



export const Login: React.FC<Props> = ({ email, password, setEmail, setPassword, handleEmailSignin, handleFacebookSignin, handleGoogleSignin }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography>Please Login</Typography>
        <div>
          <FormControl>
            <TextField
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </FormControl>
        </div>
        <Button title="login with email" onClick={handleEmailSignin} />
        <Button title="login with facebook" onClick={handleFacebookSignin} />
        <Button title="login with google" onClick={handleGoogleSignin} />
      </Grid>
    </div>
  );
}