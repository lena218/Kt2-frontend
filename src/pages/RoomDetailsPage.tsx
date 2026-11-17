import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Title, Button, SimpleGrid, Card, Text, Group,
  Modal, TextInput, Stack, Notification, Select, Badge
} from '@mantine/core';
import { saveBooking, getBookings } from '../storage';
import { generateTimeSlots, formatTime, isTimeOverlapping } from '../timeUtils';
import type { Booking } from '../types';

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [duration, setDuration] = useState<string>('60'); 
  const [successMsg, setSuccessMsg] = useState('');

  
  const allBookings = getBookings();
  const today = new Date().toISOString().slice(0, 10);
  const roomBookings = allBookings.filter(
    (b) => b.roomId === roomId && b.date === today
  );

  const room = {
    id: roomId ?? '',
    name:
      roomId === '1' ? 'Переговорная "Альфа"'
      : roomId === '2' ? 'Переговорная "Бета"'
      : 'Конференц-зал "Гамма"',
  };

  const timeSlots = generateTimeSlots();

  const handleBookClick = (time: number) => {
    setSelectedMinutes(time);
    setGuestName('');
    setMeetingTitle('');
    setDuration('60');
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!guestName.trim() || !meetingTitle.trim()) return;

    const booking: Booking = {
      id: crypto.randomUUID(),
      roomId: room.id,
      roomName: room.name,
      date: today,
      startMinutes: selectedMinutes,
      durationMinutes: Number(duration),
      guestName: guestName.trim(),
      meetingTitle: meetingTitle.trim(),
    };

    saveBooking(booking);
    setModalOpen(false);
    setSuccessMsg(`Бронь на ${formatTime(selectedMinutes)} подтверждена!`);
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
        {timeSlots.map((time) => {
          // Проверяем, занят ли этот слот (хотя бы на 15 минут)
          const isOccupied = isTimeOverlapping(time, 15, roomBookings);

          return (
            <Card 
              key={time} 
              shadow="sm" 
              padding="md" 
              radius="md" 
              withBorder 
              bg={isOccupied ? 'gray.1' : 'white'}
            >
              <Group justify="space-between" align="center">
                <Text fw={500} size="lg" c={isOccupied ? 'dimmed' : 'black'}>
                  {formatTime(time)}
                </Text>
                {isOccupied ? (
                  <Badge color="gray">Занято</Badge>
                ) : (
                  <Button
                    size="xs"
                    color="blue"
                    variant="light"
                    onClick={() => handleBookClick(time)}
                  >
                    Забронировать
                  </Button>
                )}
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Бронирование на ${formatTime(selectedMinutes)}`}
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
          <Select
            label="Продолжительность"
            value={duration}
            onChange={(val) => setDuration(val || '60')}
            data={[
              { value: '15', label: '15 минут' },
              { value: '30', label: '30 минут' },
              { value: '45', label: '45 минут' },
              { value: '60', label: '1 час' },
              { value: '90', label: '1.5 часа' },
              { value: '120', label: '2 часа' },
            ]}
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