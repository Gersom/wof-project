function getRandomIntegerInRange(min=1, max=1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default getRandomIntegerInRange