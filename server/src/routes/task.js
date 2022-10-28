import express, { Router } from "express"
import Task from "../models/task.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/task', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/task/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
	        return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

export default router