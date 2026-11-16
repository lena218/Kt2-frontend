import { Routes, Route, Link } from 'react-router-dom'
import { Container, Group, Button } from '@mantine/core'
import RoomsPage from './pages/RoomsPage' 

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
        <Route path="/rooms/:roomId" element={<h1>Расписание комнаты (в разработке)</h1>} />
        <Route path="/bookings" element={<h1>Мои брони (в разработке)</h1>} />
      </Routes>
    </>
  )
}

export default App