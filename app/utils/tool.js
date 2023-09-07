const fs = require('fs')
const path = require('path')

const getJSFile = (filePath) => {
  // console.log(1)
  const srcPath = path.resolve(__dirname, filePath)
  const JSFile = []
  // console.log(srcPath)
  const result = fs.readdirSync(srcPath)
  console.log(result)
  result.forEach((r) => {
    const JSFileName = r.split('.')[0]
    JSFileName && JSFile.push(JSFileName)
  })
  // console.log(JSFile)
  return JSFile
}

const succ = (data) => {
  return {
    status: 0,
    data,
  }
}
const fail = (msg, status = 1) => {
  return {
    status,
    msg,
  }
}

module.exports = {
  getJSFile,
  succ,
  fail,
}
