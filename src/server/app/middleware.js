export const error = (err, req, res, next) => {
  const { message } = err;
  console.error(message);
  res.status(500).json({ message });
};
