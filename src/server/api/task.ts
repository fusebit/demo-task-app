import express from "express";
import fetch from 'node-fetch';
import MemoryManager from '../MemoryStorage';
const router = express.Router();

const getHeaders = () => ({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FUSEBIT_JWT}`
})

router.post('/', async (req, res, next) => {
    const task = req.body;
    const tenantId = req.session.tenantId;
    const isSlackEnabled = MemoryManager.isSlackEnabled(tenantId);

    // send slack message in public channel, using integration
    if (isSlackEnabled) {
        // Can be done in background
        try {
            fetch(`${process.env.FUSEBIT_URL}/integration/slack-integration/api/${tenantId}/postSlackMessage`,
                {method: 'POST', headers: getHeaders(), body: JSON.stringify(task)});
        } catch (e) {
            console.log("Error posting message through integration")
        }
    }

    // Internal management
    MemoryManager.addTask(req.body);
    res.send(req.body);
});

router.get('/', async (req, res, next) => {
    res.send(MemoryManager.getTasks());
})

export default router;