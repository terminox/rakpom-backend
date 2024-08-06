import { Router, Request, Response } from 'express'

import { shopAuth } from './middlewares/auth'

import LoginRouter from './shop_login/login.router'
import SignupRouter from './shop_signup/signup.router'
import ShopProfileRouter from './shop_profile/shop_profile.router'
import ShopProfileUpdateRouter from './shop_profile_update/router'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const router = LoginRouter.makeDefaultRouter()
  router.handle(req, res)
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

router.get('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.patch('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileUpdateRouter.makeDefaultRouter()
  router.handle(req, res)
})

export default router
