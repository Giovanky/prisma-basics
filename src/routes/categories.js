import {Router} from 'express'
import {prisma} from '../db.js'

const router = Router()

router.get('/categories', (req, res) => {
    const categories = prisma.category.findMany()
    res.json({data: categories})
})

export default router