class CustomError extends Error {
    constructor(msg, status) {
        // Call the parent class (Error) constructor with the message
        super(msg);
        
        // Custom property for status code
        this.statusCode = status;
        
        // Set the name of the error to this class name
        this.name = this.constructor.name;
        
        // Capture the stack trace (if supported in the environment)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            message: this.message,
            statusCode: this.statusCode,
            name: this.name,
            stack: this.stack  
        };
    }
}

module.exports = CustomError