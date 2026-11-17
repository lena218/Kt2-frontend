import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Title, Button, Card, Text, Group, Stack,
  Badge, Notification, ActionIcon,
} from '@mantine/core';
import { getBookings } from '../storage';
import { formatTime } from '../timeUtils';
import type { Booking } from '../types';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    // Фильтруем при загрузке: оставляем только те брони, у которых есть startMinutes
    return getBookings().filter((b) => typeof b.startMinutes === 'number');
  });
  const [msg, setMsg] = useState('');

  const handleCancel = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    setMsg('Бронь отменена');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <Container size="lg" mt="xl">
      <Link to="/">
        <Button variant="subtle" mb="md">← К списку комнат</Button>
      </Link>

      <Title order={2} mb="xl">Мои брони</Title>

      {msg && (
        <Notification color="green" mb="md" onClose={() => setMsg('')}>
          {msg}
        </Notification>
      )}

      {bookings.length === 0 ? (
        <Text c="dimmed">Пока нет ни одной брони.</Text>
      ) : (
        <Stack>
          {bookings.map((b) => (
            <Card key={b.id} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" align="flex-start">
                <div>
                  <Group gap="xs" mb="xs">
                    <Badge color="blue">
                      {formatTime(b.startMinutes)} - {formatTime(b.startMinutes + (b.durationMinutes || 0))}
                    </Badge>
                    <Badge color="gray" variant="light">{b.date}</Badge>
                  </Group>
                  <Text fw={600} size="lg">{b.meetingTitle}</Text>
                  <Text c="dimmed" size="sm">{b.roomName}</Text>
                  <Text size="sm" mt="xs">Гость: {b.guestName}</Text>
                </div>
                <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  onClick={() => handleCancel(b.id)}
                  title="Отменить бронь"
                >
                  ✕
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}