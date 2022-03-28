const validator = require("email-validator")
const { possiblePositions } = require("../common/possible-positions")
const Users = require("../repository/users")

exports.checkFields = async(ctx, next) =>{
    const {firstName,lastName,email,dateStarted,salary,position,managerId}=ctx.request.body
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
    // validate email
    if(!email||email.length===0||!validator.validate(email)){
        errorArr.push('Must provide a valid email')
    }else{
        const user = await users.findOne({email})
        if(user){
            errorArr.push('Email is in use')
        }
    }

    // validate dateStarted
    if(!dateStarted||dateStarted.length===0||!Date.parse(dateStarted)){
        errorArr.push('Must provide a valid date')
    }
    // validate salary
    if(!salary||!Number.isInteger(salary)|| salary.length===0||salary<0){
        errorArr.push('Must provide a valid salary')
    }
    //validate position
    if(!position|| position.length===0){
        errorArr.push('Must provide a position')
    }else if(!possiblePositions.includes(position)){
        errorArr.push(`Position must be one of ${possiblePositions.join(', ')}`)
    }else{
        switch(position){
            case 'manager'://the user is a boss

            break;
            
            case 'worker' ,'driver'://the user is an employee
                if(!managerId||managerId.length===0||!managerId.match(/^[0-9a-fA-F]{24}$/)){
                    errorArr.push('Must provide a valid managerId')
                }else { // manager ID was recived
                    try {
                        const user =await users.findOne({_id:managerId})
                        if(user===null){
                            errorArr.push('User with the id:managerId Does not exists')
                        }else if(user.position!=='manager'){
                            errorArr.push('The user with the id:managerId is not a manager')
                        }
                    } catch (error) {
                        console.log('error: ', error);
                        errorArr.push('Must provide a valid managerId')
                    }
                 
                }
            break;
        }
    }
    
    if(errorArr.length>0){
        ctx.body=errorArr.join(', ')
        ctx.status=400
    }else{
        await next()
    }

}
