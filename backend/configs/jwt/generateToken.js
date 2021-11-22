import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, "MY JWT SECRET !", {
    expiresIn: '30d',
  })
}

export default generateToken