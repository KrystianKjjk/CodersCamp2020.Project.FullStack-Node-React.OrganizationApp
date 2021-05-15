import * as express from 'express'
import * as mongoose from 'mongoose'

const idValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  //check if id is of objectId type, otherwise throw an error
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: `id is invalid` })
  next()
}

export const idsValidation = (ids: string[] = ['*']) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  //check if id is of objectId type, otherwise throw an error
  if (ids[0] === '*') ids = Object.keys(req.params)
  for (let i in ids)
    if (!mongoose.Types.ObjectId.isValid(req.params[ids[i]]))
      return res.status(400).json({ error: `${ids[i]} is invalid` })
  next()
}

export default idValidation
