import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
<<<<<<< HEAD
  <Container type="button" {...rest}>
    {loading ? 'Loading...' : children}
=======
  <Container type="button" {...rest} >
    {loading ? 'Carregando...' : children}
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d
  </Container>
)

export default Button
