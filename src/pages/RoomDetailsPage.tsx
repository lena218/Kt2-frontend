import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Title, Button, SimpleGrid, Card, Text, Group,
  Modal, TextInput, Stack, Notification,
} from '@mantine/core';
import { saveBooking } from '../storage';
import type { Booking } from '../types';

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 20; i++) {
    slots.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return slots;
};

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [guestName, setGuestName] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const room = {
    id: roomId ?? '',
    name:
      roomId === '1' ? 'Переговорная "Альфа"'
      : roomId === '2' ? 'Переговорная "Бета"'
      : 'Конференц-зал "Гамма"',
  };

  const timeSlots = generateTimeSlots();
  const today = new Date().toISOString().slice(0, 10);

  const handleBookClick = (time: string) => {
    setSelectedTime(time);
    setGuestName('');
    setMeetingTitle('');
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!guestName.trim() || !meetingTitle.trim()) return;

    const booking: Booking = {
      id: crypto.randomUUID(),
      roomId: room.id,
      roomName: room.name,
      date: today,
      time: selectedTime,
      guestName: guestName.trim(),
      meetingTitle: meetingTitle.trim(),
    };

    saveBooking(booking);
    setModalOpen(false);
    setSuccessMsg(`Бронь на ${selectedTime} подтверждена!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <Container size="lg" mt="xl">
      <Link to="/">
        <Button variant="subtle" mb="md">← Назад к списку</Button>
      </Link>

      <Title order={2} mb="xl">{room.name}</Title>

      {successMsg && (
        <Notification color="green" mb="md" onClose={() => setSuccessMsg('')}>
          {successMsg}
        </Notification>
      )}

      <Text fw={500} mb="sm">Выберите время для бронирования:</Text>

      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {timeSlots.map((time) => (
          <Card key={time} shadow="sm" padding="md" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <Text fw={500} size="lg">{time}</Text>
              <Button
                size="xs"
                color="blue"
                variant="light"
                onClick={() => handleBookClick(time)}
              >
                Забронировать
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Бронирование на ${selectedTime}`}
        centered
      >
        <Stack>
          <TextInput
            label="Ваше имя"
            placeholder="Иван Петров"
            value={guestName}
            onChange={(e) => setGuestName(e.currentTarget.value)}
            required
          />
          <TextInput
            label="Название встречи"
            placeholder="Планёрка команды"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.currentTarget.value)}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!guestName.trim() || !meetingTitle.trim()}
            >
              Подтвердить
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}