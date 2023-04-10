import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Entity, Table } from 'dynamodb-toolbox';

import { PARTITION_KEY, SORT_KEY } from 'sharedConstants';

export const getServiceEventPK = ({
  serviceId,
  applicationId,
}: {
  serviceId: string;
  applicationId: string;
}): string => `${applicationId}#SERVICE#${serviceId}`;

export const getServiceEventSK = ({ eventId }: { eventId: string }): string =>
  `EVENT#${eventId}`;

const ServiceEventEntity = new Entity({
  name: 'ServiceEvent',
  attributes: {
    [PARTITION_KEY]: {
      partitionKey: true,
      hidden: true,
      default: getServiceEventPK,
    },
    [SORT_KEY]: {
      sortKey: true,
      hidden: true,
      default: getServiceEventSK,
    },
    serviceId: { type: 'string', required: true },
    applicationId: { type: 'string', required: true },
    eventId: { type: 'string', required: true },
  },
} as const);

export const buildServiceEventEntity = (
  documentClient: DocumentClient,
  alchemyTableName: string,
): typeof ServiceEventEntity => {
  try {
    // @ts-expect-error see https://github.com/jeremydaly/dynamodb-toolbox/issues/318
    ServiceEventEntity.table = new Table({
      partitionKey: PARTITION_KEY,
      sortKey: SORT_KEY,
      name: alchemyTableName,
      autoExecute: true,
      autoParse: true,
      DocumentClient: documentClient,
    });
  } catch {
    console.warn(
      'Entity already has a table assigned to it.',
      'Calling buildEntity more than once is not recommended. Skipping',
    );
  }

  return ServiceEventEntity;
};
