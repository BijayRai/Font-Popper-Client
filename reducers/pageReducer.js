// @flow
import { createPaginator } from '../actions/paginator'
import type { Paginator } from '../flowTypes/Pagination'
// Data shape - RECIEVE STORE PAGE
// pagination: {
//     pages: {
//       1: {
//         ids: [ 'todo1', 'todo2' ],
//         fetching: false
//       },
//     }
// }

export const pagination: Paginator = createPaginator('/stores', 'stores')
