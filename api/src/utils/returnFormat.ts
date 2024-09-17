/**
 * API return type
 *
 * {data: , error: }
 *
 */

type ErrorMessages = {
  [key: number]: string;
};

const errorMessage: ErrorMessages = {
  404: "Not found",
  401: "Missing credential",
  403: "Unauthorized",
  400: "An error occured",
};

export function wrapReturnObject(
  statusCode: number,
  message?: string | null,
  data?: object | string
) {
  return {
    data,
    message: statusCode >= 400 ? message || errorMessage[statusCode] : message,
    error: statusCode >= 400,
  };
}
