export const convertDates = (startDate, endDate) => {
    const meses = [
        'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
      ];
      const dateStart = new Date(startDate);
      const dia = dateStart.getDate();
      const mesAbreviado = meses[dateStart.getMonth()];
      const año = dateStart.getFullYear();
      
      const fechaFormateada = `${dia} de ${mesAbreviado} ${año}`;
      
        const dateEnd = new Date(endDate);
        const dayEnd = dateEnd.getDate();
        const monthEnd = meses[dateEnd.getMonth()];
        const yearEnd = dateEnd.getFullYear();
}