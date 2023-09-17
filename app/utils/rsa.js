const fs = require('fs')
const NodeRSA = require('node-rsa')
const { RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = require(':config').KEY

// 公钥加密方法
const encrypt = (str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PUBLIC_KEY_PATH, (err, data) => {
      if (err) reject(new Error(err))
      const Rsa = new NodeRSA(data)
      Rsa.setOptions({ encryptionScheme: 'pkcs1' })
      const password = Rsa.encrypt(str, 'base64')
      resolve(password)
    })
  })
}

// 私钥解密方法
const decrypt = (str) => {
  // console.log(str)
  return new Promise((resolve, reject) => {
    fs.readFile(RSA_PRIVATE_KEY_PATH, (err, data) => {
      if (err) reject(new Error(err))
      const Rsa = new NodeRSA(data)
      Rsa.setOptions({ encryptionScheme: 'pkcs1' })
      try {
        const res = Rsa.decrypt(str, 'utf8')
        resolve(res)
      } catch (e) {
        reject(e.message)
      }
    })
  })
}

module.exports = { encrypt, decrypt }
