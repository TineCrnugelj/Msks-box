const mongoose = require('mongoose');

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Tasks
 *    description: Managing tasks
 *  - name: Users
 *    description: Managing users
 *  - name: Files
 */
/**
 * @swagger
 *  components:
 *   examples:
 *    NoToken:
 *     summary: no JWT token
 *     value:
 *      message: "UnauthorizedError: No authorization token was found."
 *    Logs:
 *     summary: Logs added
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Error: 
 *    type: object
 *    description: Error details
 *    required:
 *     - message
 *    properties:
 *     message:
 *      type: string
 *    example:
 *     message: Parameters are mandatory
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
 *   TasksSummary:
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
 * 
 *   AddTaskSchema:
 *    type: object
 *    properties:
 *     source:
 *      type: string
 *      example: file:///home/lukacu/checkouts/gaptrack/
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
 *     tag:
 *      type: string
 *      example: tag
 *    required:
 *     - source
 *     - entrypoint
 *     - arguments
 *
 *   AddLogsSchema:
 *    type: object
 *    properties:
 *     logData:
 *      type: array
 *      items:
 *       type: string
 *
 *    required:
 *     - logData
 *   
 *   AddTaskResponse:
 *    type: object
 *    properties:
 *     user:
 *      type: string
 *      example: 62b5cd5aa614c565c00ea9f0
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
 *      example: 2022-07-08T12:38:01.493Z
 *     updated:
 *      type: string
 *      example: 2022-07-08T12:38:01.493Z
 *     _id:
 *      type: string
 *      example: 62c82529a4d213c3cceb1bab
 *      
 * 
 *   UpdateTaskSchema:
 *      type: object
 *      properties:
 *       source:
 *        type: string
 *        example: file:///home/lukacu/checkouts/gaptrack/
 *       entrypoint:
 *        type: string
 *        example: train_match
 *       arguments:
 *        type: array
 *        items:
 *          type: string
 *        example:
 *         - feature_reduction=256
 *         - augment_move=60
 *       tag:
 *        type: string
 *        example: tag
 *      required:
 *       - source
 *       - entrypoint
 *       - arguments 
 * 
 *   UpdateTaskResponse:
 *      type: object
 *      properties:
 *       user:
 *        type: string
 *        example: 62b5cd5aa614c565c00ea9f0
 *       repository:
 *        type: string
 *        example: file:///home/lukacu/checkouts/gaptrack/
 *       commit:
 *        type: string
 *        example: master
 *       entrypoint:
 *        type: string
 *        example: train_match
 *       arguments:
 *        type: array
 *        items:
 *         type: string
 *        example:
 *         - feature_reduction=256
 *         - augment_move=60
 *       status:
 *        type: string
 *        example: PENDING
 *       created:
 *        type: string
 *        example: 2022-07-08T12:38:01.493Z
 *       updated:
 *        type: string
 *        example: 2022-07-08T12:38:01.493Z
 *       _id:
 *        type: string
 *        example: 62c82529a4d213c3cceb1bab
 *   
 *   LockTaskResponse:
 *      type: object
 *      properties:
 *       message: Task 62c82529a4d213c3cceb1bab locked. 
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
 *    summary: Get all tasks of a user
 *    tags: [Tasks]
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: query
 *       name: status
 *       schema:
 *        type: string
 *       example: PENDING
 *     - in: query
 *       name: sort
 *       description: Sort value for creation timestamp, desc for descending order, asc for ascending order
 *       example: desc
 *    responses:
 *     "200":
 *      description: Request succeeded, the list of tasks is returned
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: "#/components/schemas/TasksSummary"
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
 *  /tasks/{hash}:
 *   get:
 *    summary: Get a single task
 *    description: Get details of a single task according to the id provided.
 *    tags: [Tasks]
 *    parameters:
 *     - in: path
 *       name: hash
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
 *          $ref: "#/components/schemas/TasksSummary"
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
 *     "200":
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

/**
 * @swagger
 *  /tasks:
 *   post:
 *    summary: Add a new task
 *    description: Add a new task with all required data - user, repository, entrypoint and arguments
 *    tags: [Tasks]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: Task data
 *     required: true 
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/AddTaskSchema"
 *    responses:
 *     "201":
 *      description: Task successfully added and it's retured in the response field
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/AddTaskResponse"
 *     "400":
 *      description: Task adding failed.
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 */


/**
 * @swagger
 *  /tasks/{taskId}/lock:
 *   post:
 *    summary: Lock a task
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
 *      description: Body containing accessToken, refreshToken and expiresIn
 */

/**
 * @swagger
 *  /tasks/{taskId}/unlock:
 *   post:
 *    summary: Unlock a task
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
 *      description: Body containing a task.
 */

/**
 * @swagger
 *  /tasks/{taskId}/log:
 *   post:
 *    summary: Add logs for task taskId
 *    tags: [Tasks]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: JSON object with key logData and an array of strings (log lines)
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         type: string
 *       example: {"logData": [
 *         "2021-06-14 13:22:24,859 ignite.handlers.early_stopping.EarlyStopping INFO: EarlyStopping: Stop training",
 *         "test_loss_seg: 0.2016",
 *         "test_loss_loc: 0.2094",
 *         "test_loss_box: 0.2755",
 *         "test_loss_emb: 0.268",
 *         "test_loss: 0.7033",
 *         "Preview: file://epoch_038.jpg"
 *     ]}
 *
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
 *      description: Array containing added lines.
 *      content:
 *       application/json:
 *        examples:
 *
 */

/**
 * @swagger
 *  /tasks/{taskId}/status:
 *   post:
 *    summary: Set status for a task
 *    tags: [Tasks]
 *    security:
 *     - jwt: []
 *    requestBody:
 *     description: JSON object with key status and a string containing new status value
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 *       example: {
 *                      "status": "PENDING"
 *               }
 *
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
 *      description: Object containing updated task body
 *      content:
 *       application/json:
 *        examples:
 *
 */

/**
 * @swagger
 *  /tasks/{taskId}/tag:
 *   put:
 *    summary: Set tag for a task
 *    tags: [Tasks]
 *    requestBody:
 *     description: JSON object with key tag and a string containing a new tag value
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: string
 *       example: {
 *                      "tag": "train_match"
 *               }
 *
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
 *      description: Object containing updated task body
 *      content:
 *       application/json:
 *        examples:
 *
 */

/**
 * @swagger
 *  /token:
 *   post:
 *    summary: Get new token (extend lock)
 *    description: Get new access token from a refresh token provided in the request's body
 *    tags: [Tasks]
 *    requestBody:
 *     description: Task data
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         token: string
 *        example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YXNrSWQiOiI2MzAyNTQ3ZGNhYjNkZTZmZTc3NTNiY2QiLCJpYXQiOjE2NjExNTIzMTgsImV4cCI6MTY2MTE1MjQ5OH0.UrsyzrRqxKU9CzJDJBIC-4WDEmTzS5US7otkfr8RhnA"}
 *    responses:
 *     "200":
 *      description: Object containing updated task body
 *      schema:
 *       type: file
 *       format: binary
 *
 */

/**
 * @swagger
 *  /tasks/{taskId}/plots:
 *   get:
 *    summary: Get all plots of a task
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *    tags: [Tasks]
 *    responses:
 *     "200":
 *      description: Object containing updated task body
 *      schema:
 *       type: file
 *       format: binary
 *
 */

/**
 * @swagger
 *  /tasks/{taskId}/reset:
 *   post:
 *    summary: Reset task
 *    description: Remove plots, if query parameter clear is yes also delete all related files
 *    security:
 *     - jwt: []
 *    parameters:
 *     - in: path
 *       name: taskId
 *       description: Unique ID of a task
 *       schema:
 *        type: string
 *       required: true
 *       example: 6ded18eb51386c3799833191
 *     - in: query
 *       name: clear
 *       schema:
 *        type: string
 *       example: yes
 *    tags: [Tasks]
 *    responses:
 *     "200":
 *      description: Object containing updated task body
 *      schema:
 *       type: file
 *       format: binary
 *
 */

const taskSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    repository: {type: String, required: true},
    commit: {type: String, default: 'master'},
    entrypoint: {type: String, required: true},
    arguments: [{type: String, required: true}],
    status: {type: String, default: 'PENDING'},
    command: {type: String},
    created: {type: Date},
    updated: {type: Date},
    tag: {type: String},
    dependencies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
    isDependency: {type: Boolean, default: false},
    hash: {type: String},
    locked: {type: Boolean, default: false},
    logs: [{type: String}],
});

module.exports = mongoose.model( 'Task', taskSchema, 'Task');