import { Errors } from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query,
    });

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(", ");

        return next(Errors.badRequest(message));
    }

    if (result.data.body) req.body = result.data.body;
    if (result.data.params) req.params = result.data.params;
    if (result.data.query) req.query = result.data.query;

    next();
};

export default validate;