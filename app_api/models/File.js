const mongoose = require('mongoose');

/**
 * @swagger
 *  /tasks/{taskId}/files:
 *   post:
 *    summary: Upload files
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *         type: object
 *         properties:
 *          files:
 *           type: array
 *           items:
 *            type: string
 *            format: binary
 *    security:
 *     - jwt: []
 *    tags: [Files]
 *    responses:
 *     "200":
 *      description: File successfully uploaded
 *
 */

/**
 * @swagger
 *  /tasks/{taskId}/fileNames:
 *   get:
 *    summary: Get all files of a task
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *    tags: [Files]
 *    responses:
 *     "200":
 *      description: An array containing all file names of a task
 *
 */

const fileSchema = new mongoose.Schema({
    task: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task'},
    metadataPath: {type: String},
    size: {type: Number},
    fileData: {
        type: Map,
        of: Array
    }
});

module.exports = mongoose.model('File', fileSchema, 'File');