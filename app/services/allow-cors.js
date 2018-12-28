module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allowed-Methods',
      'GET, POST, PATCH, PUT, DELETE'
    );
    return res.status(200).json({});
  }

  next();
};
