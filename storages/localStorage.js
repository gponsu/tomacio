export default {
  getItem: (key, user) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  },
  setItem: (key, value, user) => localStorage.setItem(key, JSON.stringify(value))
};
