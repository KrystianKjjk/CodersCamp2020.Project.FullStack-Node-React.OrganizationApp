import * as express from 'express'

class extendedError extends SyntaxError {
  status: number
}

export default class ErrorMiddleware {
  serverError = (
    err: extendedError,
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    return res.status(500).json({ message: err.message })
  }
  notFoundError = (
    req: express.Request,
    res: express.Response,
    next?: express.NextFunction,
  ) => {
    return res.status(404).json({ message: 'Not found' })
  }
}
