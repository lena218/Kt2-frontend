import { Routes, Route, Link } from 'react-router-dom'
import { Container, Group, Button } from '@mantine/core'
import RoomsPage from './pages/RoomsPage'
import RoomDetailsPage from './pages/RoomDetailsPage' 

function App() {
  return (
    <>
      <Container size="md" mt="md" mb="xl">
        <Group>
          <Link to="/"><Button variant="light">Комнаты</Button></Link>
          <Link to="/bookings"><Button variant="light">Мои брони</Button></Link>
        </Group>
      </Container>

      <Routes>
        <Route path="/" element={<RoomsPage />} />
        {/* Заменяем заглушку на настоящий компонент расписания */}
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/bookings" element={<h1>Мои брони (в разработке)</h1>} />
      </Routes>
    </>
  )
}

export default App