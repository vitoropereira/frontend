import React, { useState, useCallback, useEffect, useMemo } from 'react'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

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
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number
  available: boolean
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

  const handleDateChenge = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChenge = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id])

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

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
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            onMonthChange={handleMonthChenge}
            selectedDays={selectedDate}
            onDayClick={handleDateChenge}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Contente>
    </Container>
  )
}




export default Dashboard
