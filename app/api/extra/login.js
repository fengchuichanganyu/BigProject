const { succ, rsa } = global.tool
const { getItem } = require(':query')
const { makeToken } = require(':core/session')
module.exports = async (ctx, params, next) => {
  const { account, password, role } = params

  // 校验传参是否为空
  if (!account || !password || !role) ctx.throw(400, '请输入用户名密码')
  // 校验登录角色参数
  if (!['admin', 'editor'].includes(role)) ctx.throw(400, '用户角色参数错误')
  // 验证加密
  const req = await rsa
    .encrypt(password)
    .catch((e) => ctx.throw(400, '无法加密，请检查私钥是否正确'))
  // console.log(req)
  // 校验传入密码是否能解密，如能解密则赋值 reqPw
  const reqPw = await rsa
    .decrypt(req)
    .catch((e) => ctx.throw(400, '无法解密，请检查公钥是否正确'))
  // 从数据库存储用户信息，根据不同角色，从不同表内读取
  const dbUser = await getItem(role === 'admin' ? 'Manages' : 'Editor', {
    account,
  })
  // 校验传入用户名是否存在
  if (!dbUser) ctx.throw(400, '找不到该用户')
  const dbPw = await rsa
    .decrypt(dbUser.password)
    .catch((e) => ctx.throw(500, '用户密码存在异常'))
  // 校验密码是否正确
  if (dbPw !== reqPw) ctx.throw(400, '用户名密码错误')

  // 用户通过校验
  const token = await makeToken(role, account)
  // setTimeout(async () => {
  //   console.log('222', token, await getToken(token))
  // }, 500)
  // setTimeout(async () => {
  //   console.log('222', token, await removeToken(token))
  // }, 2000)
  ctx.cookies.set('token', token, {
    httpOnly: true,
  })
  ctx.body = succ({ token })
}
