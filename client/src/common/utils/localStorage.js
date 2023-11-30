export const saveToLocalStorage = (key, value) => {
  // Convert the value to a JSON string and save it to localStorage
  localStorage.setItem(key, JSON.stringify(value));
  return true
}

export const getFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  if(storedValue) return JSON.parse(storedValue);
  return {}
}

export default ''