function localTime() {
    return new Date(Date.now()).toLocaleString()
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length == 0
}

function objectToString(obj, name) {    
    let msg = name ? `${name} ` : ''
    msg += JSON.stringify(obj).replaceAll(',',', ')
    return  msg
}


function objectsArrayToString(array) {
    let msg = ''
    for (const obj of array) {
        msg += JSON.stringify(obj) + ', '
    }

    return msg.slice(0, -2)
}

function logAPICall(req, controllerName) {
    console.log('[api_server]',localTime(), req.method, 'v'+req.httpVersion ,req.baseUrl + req.url, '@' + controllerName)
    if (!isObjectEmpty(req.params)) {
        console.log(objectToString(req.params, '[api_server] [request][params]'))
    }

    if (!isObjectEmpty(req.body)) {
        console.log(objectToString(req.body, '[api_server] [request][body]'))
    }

}

function isObjectInArray(objId, array) {
    const res = array.map((employeeInfo) => {employeeInfo._id === objId})
    if (res.length === 0) return false
    return true
}


//Log functions
function logInfo(msg) {
    console.log(`[api_server] ${msg}`)
}

function logWarning(msg) {
    console.log(`[api_server] [warning] ${msg}`)
}

function logPrivateFunction(funcName, ...args) {
    console.log(`[api_server] [${funcName}][args:${args.length}] ${JSON.stringify(args)}`.replaceAll(',',', '))
}

function logMongoose(collectionName, methodName, ...methodArgs) {
    console.log(`[${'mongoose'.padEnd('api_server'.length)}] ${localTime()} ${collectionName}.${methodName}(${objectsArrayToString(methodArgs)})`)
}

module.exports = {logAPICall, logMongoose, logPrivateFunction, logInfo, isObjectInArray, logWarning}