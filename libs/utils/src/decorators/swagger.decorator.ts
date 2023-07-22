import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiProperty, ApiResponse, getSchemaPath } from "@nestjs/swagger";

type SchemaType = { new (...args): unknown } | [{ new (...args): unknown }];

type SwaggerOptsType = {
  body?: SchemaType;
  response?: SchemaType;
  auth?: string;
};

class GeneralSchema {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

const Response = (Schema: SchemaType) => {
  const isArray = Array.isArray(Schema);
  const parsedSchema = isArray ? getSchemaPath(Schema[0]) : getSchemaPath(Schema);
  const dataProperty = isArray ? { items: { $ref: parsedSchema } } : { $ref: parsedSchema };

  return applyDecorators(
    ApiExtraModels(GeneralSchema, isArray ? Schema[0] : Schema),
    ApiResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(GeneralSchema) }, { properties: { data: dataProperty } }],
      },
    })
  );
};

export function Swagger({ body, response, auth }: SwaggerOptsType) {
  const decorators = [];
  if (body) decorators.push(ApiBody({ type: body }));
  if (response) decorators.push(Response(response));
  if (auth) decorators.push(ApiBearerAuth(auth));

  return applyDecorators(...decorators);
}
