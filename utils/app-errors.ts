class ApiError extends Error {
    title: string;
    status: number;

    constructor(
        title: string = "Internal Server Error",
        message: string = "Something went wrong",
        status: number = 500) {
        super(message);
        this.title = title;
        this.status = status;
    }
}

class NotFoundError extends ApiError {
    constructor(title = "Not Found", message = "Not Found Recource") {
        super(title, message, 404);
    }
}
class BadRequestError extends ApiError {
    constructor(title = "Bad_Request", message = "Bad request") {
        super(title, message, 400);
    }
}

class UnauthorizedError extends ApiError {
    constructor(title = "Unauthorized", message = "Unauthorized") {
        super(title, message, 401);
    }
}

class UnauthenticatedError extends ApiError {
    constructor(title = "Unauthenticated", message = "Unauthenticated") {
        super(title, message, 401);
    }
}

class ConflictError extends ApiError {
    constructor(title = "Conflict", message = "Conflict") {
        super(title, message, 409);
    }
}

class ValidationError extends ApiError {
    constructor(title = "Validation Error", message = "Validation Error") {
        super(title, message, 400);
    }
}


export { ApiError, BadRequestError, UnauthorizedError, UnauthenticatedError, ConflictError, ValidationError,NotFoundError };