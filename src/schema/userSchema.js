
const z = require('zod');

exports.UserRegisterSchema = z.object({
    email: z.string().email().max(20),
    password: z.string().min(6).max(10)
});

exports.UserLoginSchema =z.object({
    email:z.string().email().max(20),
    password: z.string().min(6).max(10)

})
