import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import { Container, Background, Content, AnimationContainer } from './styles'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

import getValidationsErrors from '../../utils/getValidationsErrors'

import logoImg from '../../assets/logo.svg'


interface singInFormData {
  email: string
  password: string
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { singIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: singInFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type your e-mail address'),
          password: Yup.string().required('Type your password'),
        })

        await schema.validate(data, { abortEarly: false })

        await singIn({
          email: data.email,
          password: data.password,
        })

        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            'There was an error while trying to login, check your credentials',
        })
      }
    },
    [singIn, addToast, history],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Log Into GoBarber</h1>

            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              icon={FiLock}
            />

            <Button type="submit">Log In</Button>

            <Link to="/forgot-password">Forgot password</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Sign up for GoBarber
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SingIn
