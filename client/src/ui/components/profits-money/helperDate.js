export const setMonthDate = (date) => {

  const dateObj = new Date(date);

  const options = { month: "long" };
  const nameMonth = dateObj
    .toLocaleDateString("es-ES", options)

  return nameMonth.charAt(0).toUpperCase() + nameMonth.slice(1);
};
