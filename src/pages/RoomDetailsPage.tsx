import { useParams, Link } from 'react-router-dom';
import { Container, Title, Button, SimpleGrid, Card, Text, Group } from '@mantine/core';

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 20; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

export default function RoomDetailsPage() {
  const { roomId } = useParams(); 
  

  const room = {
    id: roomId,
    name: roomId === '1' ? 'Переговорная "Альфа"' : roomId === '2' ? 'Переговорная "Бета"' : 'Конференц-зал "Гамма"',
  };

  const timeSlots = generateTimeSlots();

  return (
    <Container size="lg" mt="xl">
      <Link to="/">
        <Button variant="subtle" mb="md">← Назад к списку</Button>
      </Link>
      
      <Title order={2} mb="xl">{room.name}</Title>

      <Text fw={500} mb="sm">Выберите время для бронирования:</Text>

      {/* Сетка со слотами */}
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {timeSlots.map((time) => (
          <Card key={time} shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <Text fw={500} size="lg">{time}</Text>
              {/* Кнопка пока просто заглушка */}
              <Button size="xs" color="blue" variant="light">
                Забронировать
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}