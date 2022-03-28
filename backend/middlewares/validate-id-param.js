const Users = require("../repository/users");

exports.validateIdParam = async(ctx, next) =>{
    const {id}=ctx.params
    // check if id exists and valid mongo id
    if(!id||id.length===0||!id.match(/^[0-9a-fA-F]{24}$/)){
        ctx.body='Id must be a valid mongoose id'
        ctx.status=400
    }else {
        const users= new Users()
        const user =await users.findOne({_id:id})
        if(user===null){
            ctx.body=`User with id:${id} does not exists`
            ctx.status=404
        }else {
            await next()
        }
    }
}