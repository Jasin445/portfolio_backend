const successStatusCodes = [200, 201, 302];

const statusCodeMessages = {
  200: "OK",
  201: "Created",
  302: "Found",
  400: "Bad Request",
  401: "Unauthorized Access",
  403: "Forbidden Request",
  404: "Resource Not Found",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

const responseHandler = async (res, functionToExecute) => {
  try {
    const response = await functionToExecute();

    // Validate response structure
    if (!response || typeof response.status !== "number") {
      throw new Error("Invalid response structure from function");
    }

    const statusMessage =
      statusCodeMessages[response.status] || "Internal Server Error";
    const isSuccess = successStatusCodes.includes(response.status);

    // Handle success responses
    if (isSuccess) {
      return res.status(response.status).json({
        status: response.status,
        message: response.message || statusMessage,
        data: response.data || null,
      });
    }

    // Handle error responses
    return res.status(response.status).json({
      status: response.status,
      message: response.message || statusMessage,
      error: response.error || "An error occurred, please try again later",
    });
  } catch (error) {
    console.error("Response Handler Error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to process request",
    });
  }
};

class ResponseHandler {
  static success(
    res,
    data = "data fetched successfuly!",
    message,
    status = 200
  ) {
    return res.status(status).json({
      status,
      success: true,
      message,
      data,
    });
  }

  static created(res, data, message = "Resource created successfully") {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  // Error responses
  static error(res, message = "An error occurred", statusCode = 500) {
    return res.status(statusCode).json({
      status: statusCode,
      success: false,
      error: message,
    });
  }

  static badRequest(res, message = "Bad request") {
    return res.status(400).json({
      status: statusCode,
      success: false,
      error: message,
    });
  }

  static notFound(res, message = "Resource not found") {
    return res.status(404).json({
      status: 404,
      success: false,
      error: message,
    });
  }

  static unauthorized(res, message = "Unauthorized") {
    return res.status(401).json({
      status: 401,
      success: false,
      error: message,
    });
  }

  static forbidden(res, message = "Forbidden") {
    return res.status(403).json({
      status: 403,
      success: false,
      error: message,
    });
  }

  static serverError(res, error, includeStack = false) {
    console.error("Server Error:", error);

    return res.status(500).json({
      status: 500,
      success: false,
      error:
        process.env.NODE_ENV === "development" && includeStack
          ? error.message
          : "Internal server error",
    });
  }
}

module.exports = { responseHandler, ResponseHandler };
