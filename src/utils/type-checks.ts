/* eslint-disable @typescript-eslint/no-explicit-any */
export function isErrorResponse(data: any): data is ErrorResponse {
	return data && typeof data.error === "string"
}

export function isValidationErrorResponse(data: any): data is ValidationErrorResponse {
	return data && typeof data.validationError === "string"
}

export function isMessageResponse(data: any): data is MessageResponse {
	return data && typeof data.message === "string"
}

export function isNonSuccessResponse(data: any): data is NonSuccessResponse {
	return isErrorResponse(data) || isValidationErrorResponse(data) || isMessageResponse(data)
}

export function isErrorResponses(data: any): data is ErrorResponses {
	return isErrorResponse(data) || isValidationErrorResponse(data)
}

export function isNumber (value: any): value is number {
	return typeof value === "number"
}
