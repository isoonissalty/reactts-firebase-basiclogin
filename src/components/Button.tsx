import React from 'react'

import { Button as ButtonMaterial } from '@material-ui/core'

interface Props {
  title: string;
  onClick: () => void;
}

export const Button: React.FC<Props> = ({ title, onClick }) => {
    return (
      <ButtonMaterial color="primary" onClick={onClick}>{title}</ButtonMaterial>
    );
}