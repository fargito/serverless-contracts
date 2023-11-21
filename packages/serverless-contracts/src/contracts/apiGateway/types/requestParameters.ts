import { HttpMethod } from 'types/http';

import {
  BodyType,
  HeadersType,
  PathParametersType,
  QueryStringParametersType,
} from './common';
import { DefinedProperties } from './utils';
import { GenericApiGatewayContract } from '../apiGatewayContract';

/**
 * Computed request parameters. This enables the call to the contract to be type-safe
 */
export interface RequestParameters<BodyType> {
  method: HttpMethod;
  path: string;
  body?: BodyType;
  headers?: Record<string, string>;
  queryStringParameters?: Record<string, string>;
}

export type RequestArguments<Contract extends GenericApiGatewayContract> =
  DefinedProperties<{
    pathParameters: PathParametersType<Contract>;
    queryStringParameters: QueryStringParametersType<Contract>;
    headers: HeadersType<Contract>;
    body: BodyType<Contract>;
  }>;
