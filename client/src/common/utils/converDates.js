export const convertDates = (startDate, endDate) => {
    const meses = [
        'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
      ];
      
      const dateStart = new Date(startDate);
      const dayStart = dateStart.getDate();
      const mothStart = meses[dateStart.getMonth()];
      const yearStart = dateStart.getFullYear();
      
      const dateFormatedStart = `${dayStart} de ${mothStart} ${yearStart}`;
      
        const dateEnd = new Date(endDate);
        const dayEnd = dateEnd.getDate();
        const monthEnd = meses[dateEnd.getMonth()];
        const yearEnd = dateEnd.getFullYear();

        const dateFormatedEnd = `${dayEnd} de ${monthEnd} ${yearEnd}`;

        return {dateStart : dateFormatedStart, dateEnd : dateFormatedEnd}
}

export const convertDate = (date) => {
  const meses = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ];

  const currentDate = new Date();
  const dateStart = new Date(date);
  
  const isToday =
    dateStart.getDate() === currentDate.getDate() &&
    dateStart.getMonth() === currentDate.getMonth() &&
    dateStart.getFullYear() === currentDate.getFullYear();

  if (isToday) {
    const hours = dateStart.getHours().toString().padStart(2, '0');
    const minutes = dateStart.getMinutes().toString().padStart(2, '0');
    return `Hoy a las ${hours}:${minutes}`;
  }
  
  const dayStart = dateStart.getDate();
  const mothStart = meses[dateStart.getMonth()];
  const yearStart = dateStart.getFullYear();
  
  const dateFormatedStart = `${dayStart} de ${mothStart} ${yearStart}`;

  return dateFormatedStart;
}