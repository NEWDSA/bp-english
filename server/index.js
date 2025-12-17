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

// 读取配置
const getConfig = () => {
  try {
    const configPath = join(__dirname, 'config.json')
    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return config
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

  const config = getConfig()

  if (!config) {
    return res.status(500).json({
      success: false,
      message: '服务器配置错误'
    })
  }

  if (password === config.password) {
    return res.json({
      success: true,
      message: '验证成功',
      passwordVersion: config.passwordVersion
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

  const config = getConfig()

  if (!config) {
    return res.status(500).json({
      success: false,
      message: '服务器配置错误'
    })
  }

  if (oldPassword !== config.password) {
    return res.status(401).json({
      success: false,
      message: '旧密码错误'
    })
  }

  try {
    const configPath = join(__dirname, 'config.json')
    const newConfig = {
      password: newPassword,
      passwordVersion: (config.passwordVersion || 0) + 1
    }
    writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf-8')

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

// 版本验证接口
app.post('/api/auth/check-version', (req, res) => {
  const { passwordVersion } = req.body
  const config = getConfig()

  if (!config) {
    return res.status(500).json({
      valid: false,
      message: '服务器配置错误'
    })
  }

  if (passwordVersion === config.passwordVersion) {
    return res.json({ valid: true })
  }
  return res.json({ valid: false })
})

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`)
})
