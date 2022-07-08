const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

const {protect} = require('../middleware/auth')

router.post('/tasks', protect, ctrlRuns.postAddRun);

router.post('/tasks/reset/:taskId', ctrlRuns.postResetRun);

router.post('/tasks/status/:rutaskIdnId/:status', ctrlRuns.postStatus);

router.post('/tasks/lock/:taskId', ctrlRuns.lockRun);

router.post('/tasks/unlock/:taskId', ctrlRuns.unlockRun);

router.get('/tasks/:taskId', protect, ctrlRuns.getRun);

/**
 * @swagger
 *  /tasks:
 *   get:
 *    summary: A list of all runs
 *    descriptions: Get a list of all runs from the database
 *    tags: [Tasks]
 *    responses:
 *     "200":
 *      description: Request succeeded, the list of runs is returned
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/LokacijaBranjePovzetek"
 */

router.get('/tasks', protect, ctrlRuns.getAllRuns);

router.delete('/tasks/:taskId', protect, ctrlRuns.deleteRun);

module.exports = router;