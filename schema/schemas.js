import { schema } from 'normalizr'

export const store = new schema.Entity('stores')
export const arrayOfStores = new schema.Array(store)
