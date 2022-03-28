const { lowerRankPositions } = require("../common/possible-positions")
const Users = require("../repository/users")

exports.updateDocumentAfterCreation = async(ctx, next) =>{
    const {position,managerId,id}=ctx.request.body

    if(lowerRankPositions.includes(position)){
        const users=new Users()
        const manager = await users.findOne({_id:managerId})
        await users.updateOne({_id:id},{managerName:manager.firstName})
    }
}
