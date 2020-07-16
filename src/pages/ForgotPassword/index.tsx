import React, { useRef, useCallback, useState } from 'react'
import { FiLogIn, FiMail } from "react-icons/fi";
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useToast } from '../../hooks/toast'
import getValidadtionsErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from "./styles";
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string,
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatorio.')
            .email('Digite um e-mail valido.'),
        })

        await schema.validate(data, {
          abortEarly: false
        })



        await api.post('/password/forgot', {
          email: data.email
        })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado.',
          description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        })

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidadtionsErrors(err)

          formRef.current?.setErrors(errors)

          return
        }
        // reacti18n para fazer internacionalização...
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente noavamete.',
        })
      } finally {
        setLoading(false)
      }
    }, [addToast])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" type="text" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">Recuperar</Button>

          </Form>
          <Link to="/">
            <FiLogIn />
          Voltar
        </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}


export default ForgotPassword
