function localTime() {
    return new Date(Date.now()).toLocaleString()
}

function isObjectEmpty(obj) {
    return Object.keys(obj).length == 0
}

function printObjectInLine(obj, name) {
    let msg = name + ': {'
    for (const key in obj) {
        msg = msg + key + '=' +obj[key] + ' '
    }  
    msg = msg + '}'
    
    return msg
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
        console.log(printObjectInLine(req.params, 'params'))
    }

    if (!isObjectEmpty(req.body)) {
        console.log(printObjectInLine(req.body, 'body'))
    }

}

function logMongoose(collectionName, methodName, ...methodArgs) {
    console.log(`[mongoose] ${localTime()} ${collectionName}.${methodName}(${objectsArrayToString(methodArgs)})`)
}

module.exports = {logAPICall, logMongoose}