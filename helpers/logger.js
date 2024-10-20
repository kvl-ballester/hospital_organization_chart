const fs = require('fs');
const path = require('path');
const { Console } = require('console');

class Logger {
    static outputStream;
    static streamLogger;

    // Constructor will be call once to initialize logger
    static initialize(logPath = 'logs/stdout.log') {
        const rootDir = process.cwd();
        const absoluteLogPath = path.join(rootDir, logPath);
        Logger.outputStream = fs.createWriteStream(absoluteLogPath, { flags: 'a' });
        Logger.streamLogger = new Console({ stdout: Logger.outputStream });

        console.log('Logger initialized with path:', absoluteLogPath);
    }

    // Static method to log mesagges
    static log(msg) {
        console.log(msg);
        Logger.streamLogger.log(msg); 
    }
}

module.exports = Logger;