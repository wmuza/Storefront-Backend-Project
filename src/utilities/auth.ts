import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    )

    next()
  } catch (error) {
    res.status(401)
  }
}

const verifyId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    const decoded = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    )

    // @ts-ignore
    if (parseInt(decoded.id) !== parseInt(req.params.id)) {
      throw new Error('User id does not match!')
    }

    next()
  } catch (error) {
    res.status(401)
  }
}

export { verifyAuthToken, verifyId }
