import express from "express";
import fetch, {RequestInit} from 'node-fetch';
import stream from 'stream';
const router = express.Router();

const fetchFusebit = async (path: string, options?: Omit<RequestInit, 'body'> & {body: any}) => {
    const headers =  {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FUSEBIT_JWT}`
    };
    if (options.body) {
        const bodyStream = new stream.Readable();
        bodyStream.push(JSON.stringify(options.body));    // stream apparently does not accept objects
        bodyStream.push(null);
        // const streamBody = stream
        //     .pipe()                           // whatever you need
        //     .pipe($.fs.createWriteStream(dest));
        options.body = bodyStream;
    }

    const response = await fetch(`${process.env.FUSEBIT_URL}${path}`, {...options, headers});
    return response.json();
}

router.get('/:integrationId/install', async (req, res, next) => {
    const integrationResponse = await fetchFusebit(`/integration/${req.params.integrationId}`, {method: 'POST', body: {}});
    console.log(integrationResponse);
    res.send(integrationResponse);
    // res.redirect(`${process.env.fusebitUrl}/integration/${req.params.integrationId}/authorize`);
});

router.get('/:integrationId/callback', (req, res, next) => {

});

export default router;
