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