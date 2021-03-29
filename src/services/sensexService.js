const { parseCSV } = require('./../utils/csvParser')
const Sensex = require('./../models/sensex')


const getSensex = async ({ limit = 30, offset = 0 } = {}) => {
  try {
    console.log('[getSensex]  offset, limit: ', offset, limit)
    const records = await Sensex.find(
      {}, // Columns to Return
      ['_id', 'date', 'open', 'close'],
      {
        skip: offset, // Starting Row
        limit: limit, // Ending Row
        sort: {
          date: -1 //Sort by Date Added DESC
        }
      })
    const sensexCount = await Sensex.countDocuments()
    console.log('[getSensex] ', records.length, sensexCount)
    return {
      data: records,
      count: sensexCount
    }
  } catch (error) {
    return error
    console.log('getSensex Error: ', error)
  }
}

const addNewSensex = async ({ open, close } = {}) => {
  console.log('[sensexService  addNewSensex] ', open, close)
  // console.log('IO: ', io)
  try {
    if (!open || !close) {
      throw new Error('Invalid Request')
    }

    const sensexDocument = {
      open,
      close
    }
    const insertedDoc = await Sensex.create(sensexDocument) 

    io.emit("newSensex", {
      open: insertedDoc.open ,
      close: insertedDoc.close,
      date: insertedDoc.date,
      _id:insertedDoc._id 
    })
    console.log('io emit', io.emit)
    // emit socket event
    console.log(insertedDoc)
    return insertedDoc
  } catch (error) {
    return error
  }
}

const seedSensexData = async () => {
  try {
    // check if database has any item
    const sensexCount = await Sensex.countDocuments()
    console.log('sensexCount: ', sensexCount)
    // if yes return
    if (sensexCount) {
      return true;
    }
    // if no then get data from file and seed to table 
    const recordsArr = await parseCSV()
    const result = await Sensex.insertMany(recordsArr)
    console.log('Sensex Seeded successfully: ', result.length)
    return;
  } catch (error) {
    console.log('[seedSensexData]', error)
    return;
  }
}

module.exports = {
  getSensex,
  addNewSensex,
  seedSensexData
}

// module.exports = (io) => {
//   return {
//     getSensex,
//     addNewSensex,
//     seedSensexData
//   }
// }





// {
//   base: Mongoose {
//     connections: [[Circular]],
//       models: { },
//     modelSchemas: { },
//     events: EventEmitter {
//       _events: [Object: null prototype] { },
//       _eventsCount: 0,
//         _maxListeners: undefined,
//           [Symbol(kCapture)]: false
//     },
//     options: { pluralization: true, [Symbol(mongoose:default )]: true },
//     _pluralize: [Function: pluralize],
//       Schema: [Function: Schema] {
//       reserved: [Object: null prototype],
//         Types: [Object],
//           ObjectId: [Function]
//     },
//     model: [Function],
//       plugins: [[Array], [Array], [Array], [Array], [Array]]
//   },
//   collections: { },
//   models: { },
//   config: { autoIndex: true },
//   replica: false,
//     options: null,
//       otherDbs: [],
//         relatedDbs: { },
//   states: [Object: null prototype] {
//     '0': 'disconnected',
//       '1': 'connected',
//         '2': 'connecting',
//           '3': 'disconnecting',
//             '99': 'uninitialized',
//               disconnected: 0,
//                 connected: 1,
//                   connecting: 2,
//                     disconnecting: 3,
//                       uninitialized: 99
//   },
//   _readyState: 2,
//     _closeCalled: false,
//       _hasOpened: false,
//         plugins: [],
//           id: 0,
//             _listening: false,
//               _connectionString: 'mongodb://localhost:27019/scryanalytics',
//                 _connectionOptions: {
//     useNewUrlParser: true,
//       useUnifiedTopology: true,
//         promiseLibrary: [Function: Promise],
//           driverInfo: { name: 'Mongoose', version: '5.12.2' }
//   },
//   name: 'scryanalytics',
//     host: 'localhost',
//       port: 27019,
//         user: undefined,
//           pass: undefined,
//             client: MongoClient {
//     _events: [Object: null prototype] { newListener: [Function] },
//     _eventsCount: 1,
//       _maxListeners: undefined,
//         s: {
//       url: 'mongodb://localhost:27019/scryanalytics',
//         options: [Object],
//           promiseLibrary: [Function: Promise],
//             dbCache: Map { },
//       sessions: Set { },
//       writeConcern: undefined,
//         readPreference: [ReadPreference],
//           namespace: [MongoDBNamespace]
//     },
//     topology: NativeTopology {
//       _events: [Object: null prototype],
//         _eventsCount: 35,
//           _maxListeners: Infinity,
//             s: [Object],
//               [Symbol(kCapture)]: false,
//                 [Symbol(waitQueue)]: [Denque]
//     },
//     [Symbol(kCapture)]: false
//   },
//   '$initialConnection': Promise {
//     <pending> },
//     then: [Function],
//     catch: [Function],
//  _events: [Object: null prototype] {
//         error: [Function],
//    open: [Function: bound onceWrapper] {listener: [Function] }
//  },
//  _eventsCount: 2
//   }