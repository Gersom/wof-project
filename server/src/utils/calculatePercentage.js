const calculatePercentage = (originalAmount) => {
  const percentage = 10 // %

  var result = (originalAmount * percentage) / 100;

  // Retornar el resultado
  return {
    brutoAmount: originalAmount,
    descuentoAmount: result,
    netoAmount: originalAmount - result,
    percentage
  };
}

module.exports = calculatePercentage