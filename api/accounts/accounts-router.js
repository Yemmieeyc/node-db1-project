const router = require('express').Router()

const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  try{
    const account = await Account.getAll()
   res.json(account)

  } catch (err){
    next(err)
  }
 
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique,
    async (req, res, next) => {
  try{
    const newAccount = await Account.create(req.body)
    res.status(201).json(newAccount)
  } catch (err){
    next(err)
  }
  // DO YOUR MAGIC
})

router.put('/:id',md.checkAccountId,
  md.checkAccountPayload, 
  md.checkAccountNameUnique,
  async (req, res, next) => {
  try{
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
  } catch (err){
    next(err)
  }
  // DO YOUR MAGIC
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try{
   await Account.deleteById(req.params.id)
  } catch (err){
    next(err)
  }
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message:err.message,
  })
})

module.exports = router;
