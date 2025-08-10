export const generateSlots = () => {
  const slots = [];
  const now = new Date();

  for (let day = 0; day < 7; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() + day);
    for (let hour = 9; hour < 17; hour++) { 
      for (let min of [0, 30]) {
        const startAt = new Date(date);
        startAt.setHours(hour, min, 0, 0);

        const endAt = new Date(startAt);
        endAt.setMinutes(endAt.getMinutes() + 30);

        slots.push({ startAt, endAt });
      }
    }
  }
  return slots;
};
