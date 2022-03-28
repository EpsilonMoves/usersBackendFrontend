const Router = require('koa-router')
const { updateDocumentAfterCreation } = require('../middlewares/update-document-after-creation')
const  {checkFields: validateFields}  = require('../middlewares/validate-body-fields')
const { validateIdParam } = require('../middlewares/validate-id-param')
const { validateUpdateFields } = require('../middlewares/validate-update-fields')
const { validateUserIsManager } = require('../middlewares/validate-user-is-manager')
const Users = require('../repository/users')
const router = new Router()

router.allowedMethods()

router.get('/allUsers',async (ctx,next)=>{
    const users=new Users()
    const usersArr = await users.find()
    ctx.status=200
    ctx.body=usersArr
})

router.get('/user/:id',
    validateIdParam
,async (ctx,next)=>{
    const {id}=ctx.params
    const users=new Users()
    const user = await users.findOne({_id:id})
    ctx.status=200
    ctx.body=user
})
router.post('/updateUser/:id',
    validateIdParam,
    validateUpdateFields
    ,async(ctx,next)=>{
        const {id}=ctx.params
        const users=new Users()
        const {...updateFields}=ctx.request.body
        await users.updateOne({_id:id},updateFields)

        ctx.status=200
        ctx.body='Updated user'
})



router.post('/create',
    validateFields
,async(ctx,next)=>{
    const {...userDoc}=ctx.request.body
    const users=new Users()
    const user=await users.create(userDoc)
    ctx.request.body.id=user._id // pass the user id to the next middleware
    ctx.body=user._id
    ctx.status=201
    await next()
},
updateDocumentAfterCreation
)

router.get('/deleteUser/:id',
validateIdParam
,async(ctx,next)=>{
    const {id}=ctx.params
    const users=new Users()
    await users.deleteOne({_id:id})
    ctx.body='user deleted'
    ctx.status=200
})

router.get('/managerAndEmployees/:id',
validateIdParam,
validateUserIsManager
,async(ctx,next)=>{
    const {id}=ctx.params
    const users=new Users()
    const manager= await users.findOne({_id:id})
    const reportingToManager=await users.find({managerId:id})

    ctx.status=200
    ctx.body={manager,reportingToManager}
})


module.exports = router
