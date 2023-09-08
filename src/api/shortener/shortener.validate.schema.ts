import * as Joi from 'joi'

export const urlSchema = Joi.object({
  url: Joi.string().required()
})
