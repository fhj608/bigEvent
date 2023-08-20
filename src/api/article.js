import request from '@/utils/request.js'

export const articleGetCateService = () => request.get('/my/cate/list')

export const articleDelCateService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

export const articleAddCateService = (data) =>
  request.post('/my/cate/add', data)

export const articleEditCateService = (data) =>
  request.put('/my/cate/info', data)

export const articleGetListService = (data) =>
  request.get('/my/article/list', {
    params: data
  })

export const articleAddService = (data) => request.post('/my/article/add', data)

export const articleGetService = (id) =>
  request.get('/my/article/info', {
    params: { id }
  })

export const articleUpdateService = (data) =>
  request.put('/my/article/info', data)

export const articleDeleteService = (id) =>
  request.delete('/my/article/info', { params: { id } })
