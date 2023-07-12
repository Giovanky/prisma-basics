import {Router} from 'express'
import {prisma} from '../db.js'

const router = Router()

router.get('/products', async(req, res) => {
    const products = await prisma.product.findMany()
    res.json({data: {products}})
})

router.get('/products/:id', async(req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            category: true
        }
    })
    res.json({data: {product}})
})

router.post('/products', async(req, res) => {
    const newProduct = await prisma.product.create({
        data: req.body    
    })
    res.json(newProduct)
})

router.delete('/products/:id', async(req, res) => {
    const productDeleted = await prisma.product.delete({
        where: {
            id: parseInt(req.params.id)
        }
    })
    if(!productDeleted) {
        res.status(404).json({error: 'Producto no encontrado'})
    }
    res.json({data: {product}})
})

router.put('/products/:id', async(req, res) => {
    const productUpdated = await prisma.product.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    if(!productUpdated) {
        res.status(404).json({error: 'Producto no encontrado'})
    }
    res.json({data: {product}})
})

export default router