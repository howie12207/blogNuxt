const router = require('express').Router()
const DB = require('./db')

const SORT = 'sort'
const ARTICLES = 'articles'

// 測試用
router.get('/test', (_: any, res: any) => {
  res.send('ok')
})

// 創建文章
router.post('/create/article', async (req: any, res: any) => {
  try {
    const { name, content, createTime, updateTime, sorts } = req.body
    if (!name || !content || !createTime || !updateTime) {
      res.status(400).json({
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = { name, content, createTime, updateTime, sorts }
    const result = await DB.insert(ARTICLES, params)
    res.send(result)
  } catch (err) {
    res.status(err.code).json({
      status: 'error',
      message: err.body,
    })
  }
})

// 更新指定文章
router.put('/update/article', async (req: any, res: any) => {
  try {
    const { name, content, createTime, updateTime, sorts } = req.body
    if (!name || !content || !createTime || !updateTime) {
      res.status(400).json({
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = { name, content, createTime, updateTime, sorts }
    const _id = { _id: req.body._id }
    const result = await DB.update(ARTICLES, _id, params)
    res.send(result)
  } catch (err) {
    res.status(err.code).json({
      status: 'error',
      message: err.body,
    })
  }
})

// 取得所有文章
router.get('/fetch/articles', async (req: any, res: any) => {
  const params = req.query || {}
  const result = await DB.find(ARTICLES, params, {
    createTime: -1,
  })
  res.send(result)
})

// 取得指定文章
router.get('/fetch/article', async (req: any, res: any) => {
  const params = req.query || {}
  const result = await DB.findOne(ARTICLES, params)
  res.send(result)
})

// 刪除指定文章
router.delete('/delete/article/:id', async (req: any, res: any) => {
  if (!req.params.id) {
    res.status(400).json({
      status: 'error',
      message: '參數有誤',
    })
    return
  }
  const result = await DB.remove(ARTICLES, { _id: req.params.id })
  res.send(result)
})

// 創建分類
router.post('/create/sort', async (req: any, res: any) => {
  try {
    const { name, createTime } = req.body
    if (!name || !createTime) {
      res.status(400).json({
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const result = await DB.insert(SORT, req.body)
    res.send(result)
  } catch (err) {
    res.status(err.code).json({
      status: 'error',
      message: err.body,
    })
  }
})

// 取得所有分類
router.get('/fetch/sort', async (req: any, res: any) => {
  const params = req.query || {}
  const result = await DB.find(SORT, params, {
    createTime: -1,
  })
  res.send(result)
})

// 刪除指定分類
router.delete('/delete/sort/:id', async (req: any, res: any) => {
  if (!req.params.id) {
    res.status(400).json({
      status: 'error',
      message: '參數有誤',
    })
    return
  }
  const result = await DB.remove(SORT, { _id: req.params.id })
  res.send(result)
})

// 創建
// router.post('/create/:collection', async (req: any, res: any) => {
//   try {
//     // const { name, createTime } = req.body
//     // if (!name || !createTime) {
//     //   res.status(400).json({
//     //     status: 'error',
//     //     message: '參數有誤',
//     //   })
//     //   return
//     // }
//     const result = await DB.insert(req.params.collection, req.body)
//     res.send(result)
//   } catch (err) {
//     res.status(err.code).json({
//       status: 'error',
//       message: err.body,
//     })
//   }
// })

// 取得
// router.get('/fetch/:collection', async (req: any, res: any) => {
//   const params = req.query || {}
//   const result = await DB.find(req.params.collection, params, {
//     createTime: -1,
//   })
//   res.send(result)
// })

module.exports = router
