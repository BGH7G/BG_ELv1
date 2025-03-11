// Official Documentation : https://express-validator.github.io/docs/guides/manually-running
// can be reused by many routes

const validate = validations => {
    return async (req, res, next) => {
        // sequential processing, stops running validations chain if one fails.
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(401).json({errors: result.array()});
            }
        }

        next();
    };
};

module.exports = validate