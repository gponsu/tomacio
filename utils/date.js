function todayStartOfDay() {
  let date = new Date();
  return date.setHours(0,0,0,0);
}

export { todayStartOfDay };
