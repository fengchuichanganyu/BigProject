const { toType } = require('../../../utils/tool')

module.exports = {
  ls(params, role, ctx) {
    return params
  },
  post(params, role, ctx) {
    // console.log(toType(params))
    if (toType(params) === 'object') params = [params]
    // console.log(toType(params))

    params.map((item) => {
      console.log(item)
      if (!Object.keys(item).includes('channel_id')) {
        ctx.throw(410, '栏目ID不能为空')
      }
    })
    // if (!Object.keys(params).includes('channel_id')) {
    //   ctx.throw(410, '栏目ID不能为空')
    // }
    return params
  },
  get(params, role, ctx, id) {
    return params
  },
  put(params, role, ctx, id) {
    return params
  },
  del(params, role, ctx, id) {
    return params
  },
}
