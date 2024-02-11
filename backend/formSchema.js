const { z } = require("zod");

const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
})

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

module.exports = {
    signInSchema, signUpSchema
}