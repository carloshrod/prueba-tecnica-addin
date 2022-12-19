const ERRORS = {
    ValidationError: (res) => res.status(400).send({ msg: `Validation error!` }),

    JsonWebTokenError: (res) => res.status(401).json({ msg: 'Invalid token!' }),

    TokenExpirerError: (res) => res.status(401).json({ msg: 'Token expired!' }),

    MongoServerError: (res) => res.status(400).json({ msg: 'MongoDB error!' }),

    defaultError: (res, error) => {
        console.error(error.name)
        res.status(500).end()
    }
}

exports.errorHandler = (error, req, res, next) => {
    const handler = ERRORS[error.name] || ERRORS.defaultError;
    handler(res, error);
}