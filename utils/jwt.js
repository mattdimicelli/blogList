const getToken = (req, res, next) => {
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}
module.exports = getToken