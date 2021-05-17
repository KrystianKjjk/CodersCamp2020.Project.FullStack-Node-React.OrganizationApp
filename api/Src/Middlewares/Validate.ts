import * as express from 'express'

export default (validator) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const result = validator(req.body)
  return !result.error
    ? next()
    : res.status(400).json({ message: result.error.details[0].message })
}

export const propValid = (validator, prop: string) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.body[prop] === undefined)
    return res
      .status(400)
      .json({ error: `Property ${prop} is not defined in request body` })
  const result = validator(req.body[prop])
  return !result.error ? next() : res.status(400).json({ error: result.error })
}
