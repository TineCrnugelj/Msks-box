const mongoose = require('mongoose');

/**
 * Kategorije dostopnih točk
 * @swagger
 * tags:
 *  - name: Tasks
 *    description: Managing tasks
 *  - name: Users
 *    description: Managing users
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
 *   UserSummary:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 62b9a8454a6529d510067e1c
 *     name:
 *      type: string
 *      example: john
 *     email:
 *      type: string
 *      example: john@gmail.com
 *     token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVjNzM2OGE0ZDA3YzBhN2RlNzUxZCIsImlhdCI6MTY1NjE3ODMyMSwiZXhwIjoxNjU4NzcwMzIxfQ.s42jeam1abBs_9whK2Ywpud8dN22_FPXWeylhsFti4Y
 *   
 *   UserMe:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 62b9a8454a6529d510067e1c
 *     name:
 *      type: string
 *      example: john
 *     email:
 *      type: string
 *      example: john@gmail.com
 *    
 *
 *   AddUserSchema:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      example: john
 *     email:
 *      type: string
 *      example: john@gmail.com
 *     password:
 *      type: string
 *      example: 123123
 * 
 *    required:
 *     - name
 *     - email
 *     - password  
 * 
 *   LoginUserSchema:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      example: john@gmail.com
 *     password:
 *      type: string
 *      example: 123123
 * 
 *    required:
 *     - email
 *     - password
 * 
*/

/**
 * @swagger
 *  /users/register:
 *   post:
 *    summary: Register a new user
 *    tags: [Users]
 *    requestBody:
 *     description: User data
 *     required: true 
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/AddUserSchema"
 *    responses:
 *     "201":
 *      description: Successful request body containing details of a user
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Please enter all data / User exists
 */

/**
 * @swagger
 *  /users/login:
 *   post:
 *    summary: Login
 *    tags: [Users]
 *    requestBody:
 *     description: User data
 *     required: true 
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "#/components/schemas/LoginUserSchema"
 *    responses:
 *     "200":
 *      description: Successful login
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserSummary"
 *     "400":
 *      description: Invalid credentials
 */

/**
 * @swagger
 *  /users/me:
 *   get:
 *    summary: Get current user
 *    tags: [Users]
 *    security:
 *     - jwt: []
 *    responses:
 *     "200":
 *      description: Successful request, user returned in response body
 *      content:
 *       application/json:
 *        schema:
 *          $ref: "#/components/schemas/UserMe"
 *     
 *     "401":
 *      description: Authorization error.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "#/components/schemas/Error"
 *        examples:
 *         ni zetona:
 *          $ref: "#/components/examples/NoToken"
 *    
 */


const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
