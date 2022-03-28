const Users = require("../repository/users")

exports.validateUserIsManager= async(ctx,next)=>{
    const {id}=ctx.params
    const users= new Users()
    const user=await users.findOne({_id:id})
    if(user.position!=='manager'){
        ctx.body=`User with id:${id} is not a manager`
        ctx.status=404
    }else{
        await next()
    }
}