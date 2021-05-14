import * as mongoose from 'mongoose'

export type TMaterial = IMaterial & mongoose.Document

export interface IAnchor {
  href: string
  title: string
  description: string
}

export interface IMaterial {
  title: string
  description: string
  content_list: string
  basicFreeMaterials: IAnchor[]
  basicPaidMaterials: IAnchor[]
  extendingMaterials: IAnchor[]
  extraMaterials: IAnchor[]
  practiseMaterials: IAnchor[]
  quizLink: IAnchor[]
  extraInformation: string
}

export const MaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content_list: {
    type: String,
  },
  basicFreeMaterials: [],
  basicPaidMaterials: [],
  extendingMaterials: [],
  extraMaterials: [],
  practiseMaterials: [],
  quizLink: [],
  extraInformation: {
    type: String,
  },
})

export default mongoose.model<TMaterial>('Material', MaterialSchema)
