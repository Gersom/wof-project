const generateRandomCode = async () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';

  for (let i = 0; i < 6; i++) {
    // Select a random character from the character set
    const randomNumber = Math.floor(Math.random() * characters.length)
    // Add the character to the code
    code += characters.charAt(randomNumber);
  }

  return code;
}

module.exports = generateRandomCode 