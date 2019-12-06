export default {
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};
