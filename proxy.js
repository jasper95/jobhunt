const api = require('src/lib/api')
module.exports = async (req, res) => {
  try {
    const data = api({ url: req.url }, { isServer: true, req, res })
    res.send(200, data)
  } catch(err) {
    res.send(err.status, err.payload)
  }
}