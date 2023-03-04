import { applyDecorators } from "@nestjs/common";
import { ApiResponse, ApiBearerAuth, ApiBody, ApiResponseMetadata } from "@nestjs/swagger";

type SwaggerOpts = {
    body?: ApiResponseMetadata["type"];
    response?: ApiResponseMetadata["type"];
    auth?: string
}

export function Swagger({ body, response, auth }: SwaggerOpts) {
    const decorators = [];
    if (body) decorators.push(ApiBody({ type: body}))
    if (response) decorators.push(ApiResponse({ type: response }))
    if (auth) decorators.push(ApiBearerAuth(auth))

    return applyDecorators(...decorators);
}
