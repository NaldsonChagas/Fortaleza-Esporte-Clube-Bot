module.exports = (req, res, next) => {
  const { key18, key47 } = req.headers

  if (!key18 || !key47) {
    return res.status(401).json("You're not authorized")
  }

  if (key47 !== process.env.KEY_47 || key18 !== process.env.KEY_18) {
    return res.status(401).json('Invalid Credentials')
  }

  next()
}
