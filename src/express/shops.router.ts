import { Router, Request, Response } from 'express'

import SignupRouter from './shop_signup/signup.router'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  // TODO
})

router.post('/signup', (req: Request, res: Response) => {
  const router = SignupRouter.makeDefaultRouter()
  router.handle(req, res)
})

// router.post('/signup/google', (req: Request, res: Response) => {
//   // TODO
// })

// router.post('/signup/line', (req: Request, res: Response) => {
//   // TODO
// })

// router.post('/signup/apple', (req: Request, res: Response) => {
//   // TODO
// })

router.get('/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

router.patch('/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

export default router
