import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useToast } from '../../hooks/toast'
<<<<<<< HEAD
=======
import getValidationsErrors from '../../utils/getValidationsErrors'
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import { Container, Background, Content, AnimationContainer } from './styles'
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData): Promise<void> => {
      try {
        setLoading(true)

        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('Type your e-mail address'),
        })

<<<<<<< HEAD
        await schema.validate(data, { abortEarly: false })

        // recover password

=======
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d
        await api.post('/password/forgot', {
          email: data.email,
        })

        addToast({
          type: 'success',
          title: 'Recover password e-mail was sent',
          description:
            'We sent you an e-mail to confirm the recover password request, please check your inbox',
        })
<<<<<<< HEAD
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
=======

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err)
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
<<<<<<< HEAD
          title: 'Password recovering error',
          description:
            'There was an error while trying to recover the password, try again',
=======
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
>>>>>>> 3128c513ee5eda53f19ebcf3f09189881253ef7d
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recover password</h1>

            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Button loading={loading} type="submit">
              Recover
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Back to Log In
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
