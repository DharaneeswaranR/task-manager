import express from "express"
import User from "../models/user.js"
import Task from "../models/task.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token }) 
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()

        res.send()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        await Task.deleteMany({ owner: req.user._id })
        await req.user.remove()
        
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
}) 

export default router