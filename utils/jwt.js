const getToken = (req, res) => {
  const auth = req.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}
module.exports = getToken