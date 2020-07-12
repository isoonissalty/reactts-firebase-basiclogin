import React from 'react'

import { TextField as TextFieldMaterial } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        margin: theme.spacing(1),
        width: '25ch',
    },
  }),
);

interface Props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const TextField: React.FC<Props> = ({ name, value, onChange, disabled }) => {
  const classes = useStyles();

  return (
    <TextFieldMaterial
      name={name}
      label={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      fullWidth
      className={classes.root}
    />

  )
}