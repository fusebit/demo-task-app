import express from "express";
import MemoryManager from "../MemoryStorage";
const router = express.Router();

router.post('/login', async (req, res, next) => {
  console.log(req.body);
  if (!req.body.id || typeof req.body.id !== 'string' || typeof req.body.name !== 'string') {
    res.status(400);
    res.send({});
    return;
  }
  MemoryManager.setTenant(req.body);
  req.session.tenantId = req.body.id;
  req.session.name = req.body.name;
  res.send(req.body);
});

router.delete('/logout', (req, res, next) => {
  delete req.session.tenantId;
  delete req.session.name;
  res.send({});
});

router.get('/me', (req, res, next) => {
  if (req.session.tenantId) {
    const tenant = MemoryManager.getTenant(req.session.tenantId);
    res.send(tenant);
  } else {
    res.send({});
    res.status(403)
  }
})

export default router;
