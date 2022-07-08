const mongoose = require('mongoose');

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Tasks
 *    description: Managing tasks
 */
/**
 * @swagger
 *  components:
 *   examples:
 *    NoToken:
 *     summary: no JWT token
 *     value:
 *      message: "UnauthorizedError: No authorization token was found."
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Error:
 * 
*/

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   RunsSummary:
 *    type: object
 *    properties:
 *     user:
 *      type: string
 *      example: 62b9a8454a6529d510067e1c
 *     _id:
 *      type: string
 *      format: uuid
 *      description: enolični identifikator
 *      example: 6ded18eb51386c3799833191
 *     repository:
 *      type: string
 *      example: file:///home/lukacu/checkouts/gaptrack/
 *     commit:
 *      type: string
 *      example: master
 *     entrypoint:
 *      type: string
 *      example: train_match
 *     arguments:
 *      type: array
 *      items:
 *       type: string
 *      example:
 *       - feature_reduction=256
 *       - augment_move=60
 *     status:
 *      type: string
 *      example: PENDING
 *     created:
 *      type: string
 *      example: 2022-06-19T16:11:53.925Z
 *     updated:
 *      type: string
 *      example: 2022-06-19T16:11:53.925Z
 *    required:
 *     - user
 *     - repository
 *     - entrypoint
 *     - arguments
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *     type: object
 *     properties:
 *      _id:
 *       type: string
 *       format: uuid
 *       example: 6ded18eb51386c3799833191         
 *      user:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string    
 *       required:
 *         - name
 *         - email
 *         - password
 *      repository:
 *       type: string
 *       example: file:///home/lukacu/checkouts/gaptrack/
 *      commit:
 *       type: string
 *       example: master
 *      entrypoint:
 *       type: string
 *       example: train_match 
 *      arguments:
 *       type: array
 *       items:
 *        type: string
 *       example:
 *        - embedding=@state_16_large:state.pt
 *        - stop_epochs=200
 *        - lr_step=30
 *      status:
 *       type: string
 *       example: PENDING
 *      created:
 *       type: string
 *      updated:
 *       type: string
 *      tag:
 *       type: string
 *   
 *     required:
 *      - _id
 *      - user
 *      - repository
 *      - entrypoint
 *      - arguments
 *     
 */

/**
 * @swagger
 *  /tasks:
 *   get:
 *    summary: A list of all runs for a user
 *    descriptions: Get a list of all runs from the database
 *    tags: [Tasks]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Request succeeded, the list of runs is returned
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/RunsSummary"
 *     "401":
 *      description: Not authorized, no token
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken" 
 *     "500":
 *      description: Error accessing the data base
 *  
 */
/**
 * @swagger 
 *  /tasks/{taskId}:
 *   get:
 *    summary: Get a single task
 *    description: Get details of a single task according to the id provided.
 *    security:
 *     - jwt: []
 *    tags: [Tasks]
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *    responses:
 *     "200":
 *      description: Successful request body containing details of a task
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/RunsSummary"
 *     "401":
 *      description: Not authorized, no token
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken" 
 *     "500":
 *      description: Error accessing the data base.
 *    
 */

/**
 * @swagger 
 *  /tasks/{taskId}:
 *   delete:
 *    summary: Remove a task
 *    description: Remove a task with taskId from the data base
 *    security:
 *     - jwt: []
 *    tags: [Tasks]
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *    responses:
 *     "204":
 *      description: Task successfully deleted
 *     "404":
 *      description: Task not found
 *     "401":
 *      description: Not authorized, no token
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         no token:
 *          $ref: "#/components/examples/NoToken" 
 *    
 */

const runSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    repository: {type: String, required: true},
    commit: {type: String},
    entrypoint: {type: String, required: true},
    arguments: [{type: String, required: true}],
    status: {type: String},
    command: {type: String},
    created: {type: Date},
    updated: {type: Date},
    tag: {type: String},
    // properties: {type: String},

    // environment:

});

module.exports = mongoose.model('Run', runSchema, 'Run'); 