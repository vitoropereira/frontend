import React, { useRef, useCallback } from 'react'
import { FiLock } from "react-icons/fi";
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import getValidadtionsErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from "./styles";

interface ResetPasswordFormData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio.')
            .email('Digite um e-mail valido.'),
          password: Yup.string().required('Senha obrigatória.'),
          password_confirmation: Yup.string()
            .oneOf([
              Yup.ref('password'), null],
              'Confirmação de senha incorreta.'
            ),
        })

        await schema.validate(data, {
          abortEarly: false
        })

        history.push('/signin')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidadtionsErrors(err)

          formRef.current?.setErrors(errors)

          return
        }
        // reacti18n para fazer internacionalização...
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha.',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        })
      }
    }, [addToast, history])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova Senha"
            />

            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar Senha</Button>

          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}


export default ResetPassword
