const getToken = (req, res) => {
  // get headers from request
  const auth = req.get('Authorization')
  
  // find authorization header
  // remove "bearer" from the token
}
module.exports = getToken