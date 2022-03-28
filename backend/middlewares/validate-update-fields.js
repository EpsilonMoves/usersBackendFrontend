const validator = require("email-validator")
const { possiblePositions } = require("../common/possible-positions")
const Users = require("../repository/users")

exports.validateUpdateFields = async(ctx, next) =>{
    const {firstName,lastName}=ctx.request.body
    const users=new Users()
    const errorArr=[]

    // validate firstName
    if(!firstName||firstName.length===0){
        errorArr.push('Must provide firstName')
    }
    // validate lastName
    if(!lastName||lastName.length===0){
        errorArr.push('Must provide lastName')
    }
    
    
    if(errorArr.length>0){
        ctx.body=errorArr.join(', ')
        ctx.status=400
    }else{
        await next()
    }

}
