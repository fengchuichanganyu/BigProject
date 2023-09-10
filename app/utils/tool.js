const fs = require('fs')
const path = require('path')

// 精确判断数据类型
const toType = (obj) => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

// 获取某文件夹下全部 js 文件
const getJSFile = (filePath) => {
  // console.log(1)
  const srcPath = path.resolve(__dirname, filePath)
  const JSFile = []
  // console.log(srcPath)
  const result = fs.readdirSync(srcPath)
  // console.log(result)
  result.forEach((r) => {
    const JSFileName = r.split('.')[0]
    JSFileName && JSFile.push(JSFileName)
  })
  // console.log(JSFile)
  return JSFile
}

// 成功返回数据方法

const succ = (data) => {
  return {
    status: 0,
    data,
  }
}
// 失败返回数据方法

const fail = (msg, status = 1) => {
  return {
    status,
    msg,
  }
}

// 检查操作目录是否在项目根目录下
const isInRootPath = (path) => {
  const rootPath = process.cwd()
  // substring作用是取对象的前半部分=>（0, rootPath.length）
  const pathPre = path.substring(0, rootPath.length)
  return rootPath === pathPre
}
// 检查文件夹是否存在，若不存在则创建
const makeDir = (dirPath) => {
  // const dirPathPre = dirPath.substring(0, rootPath.length)
  return new Promise((resolve, reject) => {
    // 这里设定仅允许在项目根目录以内建立文件夹，若项目有其他需求，可调整这边的判断逻辑
    // 不建议移除该判断，否则调用该方法可以在硬盘任意地方新建文件夹，可能会不小心干了点啥对吧
    if (!isInRootPath(dirPath)) {
      reject(new Error('不支持在项目根目录以外创建文件夹！'))
    }
    fs.access(dirPath, (err) => {
      if (err) {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  })
}

const moveFile = (sourcePath, targetPath) => {
  return new Promise((resolve, reject) => {
    if (!isInRootPath(sourcePath) || !isInRootPath(targetPath)) {
      reject(new Error('不支持操作项目根目录以外的文件或文件夹！'))
    }
    // fs.rename 函数来移动或重命名文件
    fs.rename(sourcePath, targetPath, function (err) {
      if (err) {
        reject(new Error(err))
      } else {
        fs.stat(targetPath, function (err, stats) {
          if (err) {
            reject(new Error(err))
          } else {
            resolve()
          }
        })
      }
    })
  })
}

module.exports = {
  toType,
  getJSFile,
  succ,
  fail,
  makeDir,
  moveFile,
}
