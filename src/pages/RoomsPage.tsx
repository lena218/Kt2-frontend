import { Card, Text, Group, Badge, SimpleGrid, Container, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

const mockRooms = [
  { id: '1', name: 'Переговорная "Альфа"', capacity: 10, floor: 3 },
  { id: '2', name: 'Переговорная "Бета"', capacity: 4, floor: 2 },
  { id: '3', name: 'Конференц-зал "Гамма"', capacity: 20, floor: 1 },
];

export default function RoomsPage() {
  return (
    <Container size="lg" mt="xl">
      <Title order={2} mb="lg">Список переговорных комнат</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {mockRooms.map((room) => (
          <Card key={room.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{room.name}</Text>
              <Badge color="blue">Этаж {room.floor}</Badge>
            </Group>
            
            <Text size="sm" c="dimmed" mb="md">
              Вместимость: до {room.capacity} человек
            </Text>

            <Link to={`/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
              <Text size="sm" c="blue" fw={500}>
                Посмотреть расписание →
              </Text>
            </Link>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}