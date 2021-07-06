const getRusStringDateFromDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  if (typeof date === "number") {
    return new Date(date).toLocaleDateString("ru-RU", options);
  } else {
    return date.toLocaleDateString("ru-RU", options);
  }
};

const getEngStringDateFromDate = (date) => {
  if (typeof date === "number") {
    return new Date(date).toISOString().slice(0, 10);
  } else {
    return date.toISOString().slice(0, 10);
  }
};

export { getRusStringDateFromDate, getEngStringDateFromDate };
