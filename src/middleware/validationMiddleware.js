// exports.validationMiddleware= async(req,res,next)=>{
//     schema.parse(req.body)

// }
const StatusCodes =  require("http-status-codes")
module.exports= function validationMiddleware(schema){
    return (req,res,next)=>{
        try{
            console.log('====req',req.body)

        schema.parse(req.body)
        next()
        }catch(error){
            if (error) {
                const errorMessages = error.errors.map((issue) => ({
                      message: `${issue.path.join('.')} is ${issue.message}`,
                  }))
                  res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
                } else {
                  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
                }
        }
    }

}