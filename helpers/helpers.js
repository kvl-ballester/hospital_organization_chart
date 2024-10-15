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

function logAPICall(req, controllerName) {
    console.log(localTime(), req.method, 'v'+req.httpVersion ,req.baseUrl + req.url, '@' + controllerName)
    if (!isObjectEmpty(req.params)) {
        console.log(printObjectInLine(req.params, 'params'))
    }

    if (!isObjectEmpty(req.body)) {
        console.log(printObjectInLine(req.body, 'body'))
    }

}

module.exports = {logAPICall}