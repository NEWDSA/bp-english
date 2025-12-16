import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// 中间件
app.use(cors())
app.use(express.json())

// 读取密码配置
const getPassword = () => {
  try {
    const configPath = join(__dirname, 'config.json')
    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return config.password
  } catch (error) {
    console.error('读取配置文件失败:', error)
    return null
  }
}

// 密码验证接口
app.post('/api/auth/verify', (req, res) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({
      success: false,
      message: '请输入密码'
    })
  }

  const correctPassword = getPassword()

  if (!correctPassword) {
    return res.status(500).json({
      success: false,
      message: '服务器配置错误'
    })
  }

  if (password === correctPassword) {
    return res.json({
      success: true,
      message: '验证成功'
    })
  } else {
    return res.status(401).json({
      success: false,
      message: '密码错误，请重试'
    })
  }
})

// 修改密码接口
app.post('/api/auth/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: '请填写完整信息'
    })
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: '新密码长度至少6位'
    })
  }

  const currentPassword = getPassword()

  if (!currentPassword) {
    return res.status(500).json({
      success: false,
      message: '服务器配置错误'
    })
  }

  if (oldPassword !== currentPassword) {
    return res.status(401).json({
      success: false,
      message: '旧密码错误'
    })
  }

  try {
    const configPath = join(__dirname, 'config.json')
    const config = { password: newPassword }
    writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')

    return res.json({
      success: true,
      message: '密码修改成功'
    })
  } catch (error) {
    console.error('保存密码失败:', error)
    return res.status(500).json({
      success: false,
      message: '保存密码失败'
    })
  }
})

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
})
