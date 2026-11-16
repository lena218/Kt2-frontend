import { Routes, Route, Link } from 'react-router-dom'
import { Container, Group, Button } from '@mantine/core'
import RoomsPage from './pages/RoomsPage'
import RoomDetailsPage from './pages/RoomDetailsPage'
import BookingsPage from './pages/BookingsPage' 

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
        <Route path="/rooms/:roomId" element={<RoomDetailsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
      </Routes>
    </>
  )
}

export default App