import { customAlphabet } from 'nanoid'

export const generateNanoIdWithPrifix = (prefix = 'other') => {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
  const generateId = nanoid()
  return prefix + '_' + generateId
}