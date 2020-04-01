import dateFormat from 'dateformat'

const isString = x => typeof x === 'string'

const isValidDate = string => /\d{4}-\d{2}-\d{2}/.test(string)

const length = x => x.length
const zeroLength = x => length(x) === 0
const duplicate = (y) => y.filter((v,i) => y.indexOf(v) === i)

const isEmptyString = x => isString(x) && zeroLength(x)

const reFormatJSON = x => JSON.parse(JSON.stringify(x))
const cloneObject = x => Object.assign({}, x)
const cloneObjectArray = x => x.map(cloneObject)

const isNull = x => x === null
const isTruthyOrNull = x => x || isNull(x)

const assignPositions = xs =>
    xs.map((x, position) => Object.assign({}, x, { position }))

const getCookie = (name) => {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
}

const deleteCookie = (name) => {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

const formatData = (date) => {
    return dateFormat(date, 'yyyy-mm-dd H:MM:ss')
}

const catchHandler = (e) =>{
    deleteCookie('accessToken')
    location.reload()
    console.log('err', e)
}

export {
    isValidDate,
    isEmptyString,
    duplicate,
    reFormatJSON,
    cloneObject,
    formatData,
    catchHandler,
    cloneObjectArray,
    getCookie,
    deleteCookie,
    isTruthyOrNull,
    assignPositions
}

