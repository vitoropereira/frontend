import React, { useState } from 'react'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Section,
  Contente,
  Schedule,
  NextAppointment,
  Appointment,
  Calendar
} from './styles'

import logo from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const [ delectedDate, setSelectedDate] = useState(new Date())
  const { signOut, user } = useAuth();


  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img
              src={user.avatar_url}
              alt={user.name}
            />
            <div>
              <span>Bem-Vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Contente>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/47868559?s=460&u=f51880c6fc1b5497be94536b661b7d4321ebdd26&v=4"
                alt="Vitor Pereira"
              />

              <strong>Vitor Pereira</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>
              Manhã
            </strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/47868559?s=460&u=f51880c6fc1b5497be94536b661b7d4321ebdd26&v=4"
                  alt="Vitor Pereira"
                />
                <strong>Vitor Pereira</strong>
              </div>

            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/47868559?s=460&u=f51880c6fc1b5497be94536b661b7d4321ebdd26&v=4"
                  alt="Vitor Pereira"
                />
                <strong>Vitor Pereira</strong>
              </div>

            </Appointment>
          </Section>

          <Section>
            <strong>
              Tarde
              </strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/47868559?s=460&u=f51880c6fc1b5497be94536b661b7d4321ebdd26&v=4"
                  alt="Vitor Pereira"
                />
                <strong>Vitor Pereira</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar />
      </Contente>
    </Container>
  )
}




export default Dashboard
