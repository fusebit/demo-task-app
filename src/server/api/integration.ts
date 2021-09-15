import express from "express";
import fetch from 'node-fetch';
import MemoryManager from '../MemoryStorage';
const router = express.Router();

const getHeaders = () => ({
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FUSEBIT_JWT}`
})


router.get('/:integrationId/install', async (req, res, next) => {
    const tenantId = req.session.tenantId;
    const body = JSON.stringify({
        redirectUrl: `${process.env.BASE_URL}/api/integration/${req.params.integrationId}/callback`,
        tags: {
            "fusebit.tenantId": tenantId
        }
    });
    const createSessionResponse = await fetch(
        `${process.env.FUSEBIT_URL}/integration/${req.params.integrationId}/session`,
        {body, headers:getHeaders(), method: 'POST'});
    const session = await createSessionResponse.json();
    if (session.status >299) {
        res.status(session.status);
        res.send({});
        return;
    }
    const sessionId = session.id;
    MemoryManager.setTenantSessionId(tenantId, sessionId);
    res.redirect(`${process.env.FUSEBIT_URL}/integration/${req.params.integrationId}/session/${sessionId}/start`);
    res.end();
});

//TODO: Remove int name
router.get('/:integrationId/callback', async (req, res, next) => {
    const sessionId = req.query.session;
    const integrationId = req.params.integrationId
    const tenantId = req.session.tenantId;
    // Async in background
    commitSession(sessionId as string, integrationId, tenantId);
    next();
});

const commitSession = (sessionId: string, integrationId: string, tenantId: string) => {
    try {
        // Commit in background while user continues their path
        commitSessionToFusebit(sessionId, integrationId, tenantId);
    } catch (e) {
        console.log('Error committing fusebit session`')
    }
}

const commitSessionToFusebit = async (sessionId: string, integrationId: string, tenantId: string) => {
    const sessionPersistResponse = await fetch(
        `${process.env.FUSEBIT_URL}/integration/${integrationId}/session/${sessionId}/commit`,
        {headers:getHeaders(), method: 'POST'}
    );
    if (sessionPersistResponse.status > 299) {
        throw 'ERROR: fusebit session did not persist';
    }
    const sessionStatusResponse = await fetch(
        `${process.env.FUSEBIT_URL}/integration/${integrationId}/session/${sessionId}`,
        {headers:getHeaders()}
    );
    const sessionStatus = await sessionStatusResponse.json();
    console.log("Session Committed");
    console.log(sessionStatus);
    const instanceId = sessionStatus.output.entityId;

    MemoryManager.setTenantInstanceId(tenantId, instanceId);
    MemoryManager.slackEnabled(tenantId);

}

export default router;
