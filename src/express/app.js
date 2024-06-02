import express from 'express'
import morgan from 'morgan'

const app = express()

app.enable('trust proxy')

app.use(morgan('combined'))
app.use(express.json())

// MARK: - Users

app.post('/api/v1/users/login', (req, res) => {
  // TODO
})

app.post('/api/v1/users/signup', (req, res) => {
  // TODO
})

app.post('/api/v1/users/signup/google', (req, res) => {
  // TODO
})

app.post('/api/v1/users/signup/line', (req, res) => {
  // TODO
})

app.post('/api/v1/users/signup/apple', (req, res) => {
  // TODO
})

app.get('/api/v1/users/profiles/:id', (req, res) => {
  // TODO
})

app.patch('/api/v1/users/profiles/:id', (req, res) => {
  // TODO
})

app.post('/api/v1/users/booking-requests', (req, res) => {
  // TODO
})

// MARK: - Shops

app.get('/api/v1/users/shops', (req, res) => {
  // TODO
})

app.get('/api/v1/users/shops/pages', (req, res) => {
  // TODO
})

app.get('/api/v1/users/shops/recent', (req, res) => {
  // TODO
})

app.get('/api/v1/users/shops/:id', (req, res) => {
  // TODO
})

app.post('/api/v1/shops/login', (req, res) => {
  // TODO
})

app.post('/api/v1/shops/signup', (req, res) => {
  // TODO
})

app.post('/api/v1/shops/signup/google', (req, res) => {
  // TODO
})

app.post('/api/v1/shops/signup/line', (req, res) => {
  // TODO
})

app.post('/api/v1/shops/signup/apple', (req, res) => {
  // TODO
})

app.get('/api/v1/shops/profiles/:id', (req, res) => {
  // TODO
})

app.patch('/api/v1/shops/profiles/:id', (req, res) => {
  // TODO
})

export default app
