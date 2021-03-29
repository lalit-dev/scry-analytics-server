const parse = require('csv-parse')
const fs = require('fs')
const path = require('path');
// F:\Cont\scry-analytics-assignment\solution\server\data\Sensex_CSV_2018.csv

const defaultFilePath = path.join( __dirname + '../../../data/Sensex_CSV_2018.csv')

const parseCSV = (filePath = defaultFilePath ) => {
  return new Promise((resolve, reject) => {
    const output = []
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if(error) {
        console.log('errr: ', error)
      }
      parse(data, {
        trim: true,
        skip_empty_lines: true,
        from_line: 2
      })
      .on('readable', function(){
        let record
        while (record = this.read()) {
          output.push(record)
        }
      })
      .on('end', function(){ 
        const records = []
        output.forEach(item => {
          const record = {
            date: new Date(item[0]),
            open: parseFloat(item[1]),
            close: parseFloat(item[4])
          }
          records.push(record)
        });
        console.log("records", records)
        resolve(records)
      })
      .on('error', function(err){
        console.error('[csvParser] ', err.message)
        reject(err.message)
      })
    })
   
  })
}

module.exports = {
  parseCSV
}