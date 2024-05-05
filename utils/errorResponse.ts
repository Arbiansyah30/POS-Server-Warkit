import { Response } from "express";

export const errorResponse = (res: Response, code: number, message: string, path: string): void => {
  let error: string = "";
  switch (code) {
    case 400:
      error = "Bad Request";
      break;
    case 500:
      error = "Internal Server Error";
      break;
    case 501:
      error = "Not Implemented";
      break;
    case 502:
      error = "Bad Gateway";
      break;
    case 503:
      error = "Service Unavailable";
      break;
    case 504:
      error = "Gateway Timeout";
      break;
    case 505:
      error = "HTTP Version Not Supported";
      break;
    case 506:
      error = "Variant Also Negotiates";
      break;
    case 507:
      error = "Insufficient Storage";
      break;
    case 508:
      error = "Loop Detected";
      break;
    case 509:
      error = "Bandwidth Limit Exceeded";
      break;
    case 510:
      error = "Not Extended";
      break;
    case 511:
      error = "Network Authentication Required";
      break;
    case 520:
      error = "Unknown Error";
      break;
    case 521:
      error = "Web Server Is Down";
      break;
    case 522:
      error = "Connection Timed Out";
      break;
    case 523:
      error = "Origin Is Unreachable";
      break;
    case 524:
      error = "A Timeout Occurred";
      break;
    case 525:
      error = "SSL Handshake Failed";
      break;
    case 526:
      error = "Invalid SSL Certificate";
      break;
  }
  const response = {
    timestamp: new Date(),
    status: code,
    error,
    message,
    path,
  };
  res.status(code).send(response);
};
