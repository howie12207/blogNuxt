const router = require('express').Router()
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectId
const DB = require('./db')

const USERINFO = 'userInfo'
const SORT = 'sort'
const ARTICLES = 'articles'
const COMMENTS = 'comments'

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
    res
      .status(500)
      .json({ code: 500, status: 'error', mmessage: '系統錯誤，請稍後再試' })
  }
})

// 登入
router.post('/user/login', async (req: any, res: any) => {
  try {
    const { account, password } = req.body
    if (!account || !password) {
      res.status(500).json({
        code: 400,
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
      res.json({ token })
    } else {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '帳密錯誤',
      })
    }
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 取得所有文章
router.get('/article', async (req: any, res: any) => {
  try {
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
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 取得指定文章
router.get('/article/:id', async (req: any, res: any) => {
  try {
    const result = await DB.findOne(ARTICLES, { _id: ObjectId(req.params.id) })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 取得所有分類
router.get('/sort', async (req: any, res: any) => {
  try {
    const params = req.query || {}
    const result = await DB.find(SORT, params, {
      createTime: -1,
    })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 取得某篇文章留言
router.get('/comment/:id', async (req: any, res: any) => {
  try {
    const {
      articleId,
      sort = { createTime: -1 },
      page = 0,
      size = 10,
    } = req.query
    const params = {
      where: { articleId: ObjectId(articleId) },
      sort,
      limit: Number(size),
      skip: Number(page) * Number(size),
    }
    const [content, totalElements] = await Promise.all([
      DB.findTable(COMMENTS, params),
      DB.findCount(COMMENTS, params),
    ])
    res.send({ content, totalElements })
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// --------------------以下皆需驗證---------------------------

// 驗證token
router.all('*', (req: any, res: any, next: any) => {
  const token = req.headers['x-auth-token']
  jwt.verify(token, process.env.JWT_KEY, (err: any) => {
    if (err) {
      return res
        .status(401)
        .json({ code: 401, status: 'error', message: 'Unauthorized!' })
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
    return res
      .status(401)
      .json({ code: 401, status: 'error', message: 'Unauthorized!' })
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 修改密碼
router.put('/user/password', async (req: any, res: any) => {
  const token = req.headers['x-auth-token']
  try {
    const decode = jwt.decode(token, process.env.JWT_KEY)
    const findAccount = await DB.findOne(USERINFO, { account: decode.account })
    if (findAccount) {
      const { oldPassword, newPassword } = req.body
      if (findAccount.password === oldPassword) {
        const result = await DB.update(
          USERINFO,
          { _id: ObjectId(findAccount._id) },
          {
            password: newPassword,
          }
        )
        return res.json(result)
      }
      return res
        .status(500)
        .json({ code: 400, status: 'error', message: '密碼錯誤!' })
    }
    return res
      .status(401)
      .json({ code: 401, status: 'error', message: 'Unauthorized!' })
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 創建文章
router.post('/article', async (req: any, res: any) => {
  try {
    const { name, content, createTime, updateTime, sorts } = req.body
    if (!name || !content || !createTime || !updateTime) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = { name, content, createTime, updateTime, sorts }
    const result = await DB.insert(ARTICLES, params)
    // 新增留言document
    await DB.insert(COMMENTS, {
      article_id: ObjectId(result.insertedId),
      comments: [],
    })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 更新指定文章
router.put('/article/:id', async (req: any, res: any) => {
  try {
    const { name, content, createTime, updateTime, sorts } = req.body
    if (!name || !content || !createTime || !updateTime) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = { name, content, createTime, updateTime, sorts }
    const _id = { _id: ObjectId(req.body._id) }
    const result = await DB.update(ARTICLES, _id, params)
    await DB.insert(COMMENTS, {
      article_id: ObjectId(req.body._id),
      comments: [],
    })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 刪除指定文章
router.delete('/article/:id', async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const result = await DB.remove(ARTICLES, { _id: ObjectId(req.params.id) })
    // 移除留言document
    await DB.remove(COMMENTS, { article_id: ObjectId(req.params.id) })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 創建留言
router.post('/comment', async (req: any, res: any) => {
  try {
    const { createTime, account, content, articleId } = req.body
    if (!createTime || !account || !content || !articleId) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const params = {
      createTime,
      account,
      content,
      articleId: ObjectId(articleId),
    }
    const result = await DB.insert(COMMENTS, params)
    res.json(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 取得所有留言
router.get('/comment', async (req: any, res: any) => {
  try {
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
      DB.findTable(COMMENTS, params),
      DB.findCount(COMMENTS, params),
    ])
    res.send({ content, totalElements })
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 刪除指定留言
router.delete('/comment/:id', async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const result = await DB.remove(COMMENTS, { _id: ObjectId(req.params.id) })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 創建分類
router.post('/sort', async (req: any, res: any) => {
  try {
    const { name, createTime } = req.body
    if (!name || !createTime) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const result = await DB.insert(SORT, req.body)
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

// 刪除指定分類
router.delete('/sort/:id', async (req: any, res: any) => {
  try {
    if (!req.params.id) {
      res.status(500).json({
        code: 400,
        status: 'error',
        message: '參數有誤',
      })
      return
    }
    const result = await DB.remove(SORT, { _id: ObjectId(req.params.id) })
    res.send(result)
  } catch (err) {
    res.status(500).json({
      code: 500,
      status: 'error',
      message: '系統錯誤，請稍後再試',
    })
  }
})

module.exports = router
