// middlewares/validateUserSchema.js

function validateSchema (schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            console.log({
                message: "The creation failed",
                error: result.error.issues
            });
            return res.status(400).json({
                message: "The creation failed",
                error: result.error.issues
            })
        }
    req.body = result.data
    next()
    }
}

module.exports = validateSchema