import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { verifyJwt } from './middleware/auth'

const app = express()

// Public routes (no auth needed)
app.use('/api/auth', createProxyMiddleware({ 
  target: 'http://auth-service:3001' 
}))

// Protected routes
app.use('/api/events', verifyJwt, createProxyMiddleware({ 
  target: 'http://events-service:3002' 
}))

app.use('/api/social', verifyJwt, createProxyMiddleware({ 
  target: 'http://social-service:3003' 
}))

app.listen(3000)