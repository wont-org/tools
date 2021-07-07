/**
 * @desc 获取node指令 -x --xx 后面紧跟的参数
 * @returns {object}
 */
export const parseArgvOpt = (): Record<string, string[]> => {
    const { argv = [] } = process
    const reg = /^(-){1,2}[A-Za-z]+$/
    const result = {}
    let argval: string[] = []
    let nextPush = false
    let tag = ''
    for (const item of argv) {
        if (reg.test(item)) {
            result[item] = []
            argval = []
            nextPush = true
            tag = item
            continue
        }
        if (nextPush) {
            argval.push(item)
        }
        if (result[tag]) {
            result[tag] = argval
        }
    }
    console.log('parseArgvOpt :>> ', result)
    return result
}
