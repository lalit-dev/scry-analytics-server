const {getSensex, addNewSensex} = require('./../services/sensexService')

const getSensexList = (req, res) => {
    console.log(req.query)
  getSensex({ 
      offset: parseInt(req.query.offset),
      limit: parseInt(req.query.limit)
      })
      .then(result => {
          return res.status(200).json(result);
      })
      .catch(err => {
          return res.status(500).json(err);
      })
}


const addSensex = (req, res) => {
   console.log('[addSensex]', req.body)
   const body = {
       open: parseFloat(req.body.openRate),
       close: parseFloat(req.body.closeRate)
   }
  addNewSensex(body)
      .then(result => {
          //return res.status(200).json(SetResService.setResponse(applicationMessage.Message.Success.entityUpdate, result, true, 200));
          return res.status(201).json(result);
      })
      .catch(err => {
          return res.status(400).json(err);
      })
}

module.exports = {
  getSensexList,
  addSensex
}