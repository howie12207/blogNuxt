const router = require('express').Router()
const jwt = require('jsonwebtoken')
const DB = require('./db')

const USERINFO = 'userInfo'
const SORT = 'sort'
const ARTICLES = 'articles'

// 測試用
router.get('/test', (_: any, res: any) => {
  res.send('ok')
})

router.get('/test1', async (req: any, res: any) => {
  const params = req.query || {}
  try {
    const result = await DB.findCount(ARTICLES, params)
    res.json(result)
  } catch (err) {
    res.send(err)
  }
})

// 登入
router.post('/user/login', async (req: any, res: any) => {
  try {
    const { account, password } = req.body
    if (!account || !password) {
      res.status(400).json({
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = { account, password }
    const result = await DB.findOne(USERINFO, params)
    if (result) {
      const token = jwt.sign({ account, password }, process.env.JWT_KEY, {
        expiresIn: 60 * 60 * 24,
      })
      res.status(200).json({ token })
    } else {
      res.status(400).json({
        status: 'error',
        message: '帳密錯誤',
      })
    }
  } catch (err) {
    res.status(err.code).json({
      status: 'error',
      message: err.body,
    })
  }
})

// 取得所有文章
router.get('/article', async (req: any, res: any) => {
  const {
    where = {},
    sort = { createTime: -1 },
    page = 0,
    size = 10,
  } = req.query
  const params = {
    where,
    sort,
    limit: Number(size),
    skip: Number(page) * Number(size),
  }
  const [content, totalElements] = await Promise.all([
    DB.findTable(ARTICLES, params),
    DB.findCount(ARTICLES, params),
  ])
  res.send({ content, totalElements })
})

// 取得指定文章
router.get('/article/:id', async (req: any, res: any) => {
  const result = await DB.findOne(ARTICLES, { _id: req.params.id })
  res.send(result)
})

// 取得所有分類
router.get('/sort', async (req: any, res: any) => {
  const params = req.query || {}
  const result = await DB.find(SORT, params, {
    createTime: -1,
  })
  res.send(result)
})

// 驗證token
router.all('*', (req: any, res: any, next: any) => {
  const token = req.headers['x-auth-token']
  jwt.verify(token, process.env.JWT_KEY, (err: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' })
    } else {
      next()
    }
  })
})

// 取得會員資料
router.get('/user/info', async (req: any, res: any) => {
  const token = req.headers['x-auth-token']
  try {
    const decode = jwt.decode(token, process.env.JWT_KEY)
    const result = await DB.findOne(USERINFO, { account: decode.account })
    if (result) {
      const userInfo = {
        account: result.account,
        roleId: result.level === 'admin' ? 0 : 1,
      }
      return res.json(userInfo)
    }
    return res.status(401).json({ message: 'Unauthorized!' })
  } catch (err) {
    res.send(err)
  }
})

// 創建文章
router.post('/article', async (req: any, res: any) => {
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
router.put('/article/:id', async (req: any, res: any) => {
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

// 刪除指定文章
router.delete('/article/:id', async (req: any, res: any) => {
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
router.post('/sort', async (req: any, res: any) => {
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

// 刪除指定分類
router.delete('/sort/:id', async (req: any, res: any) => {
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

module.exports = router
