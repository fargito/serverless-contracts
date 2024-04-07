import {
  EventBridgeContract,
  GenericApiGatewayContract,
  getApiGatewayTrigger,
  getEventBridgeTrigger,
} from 'contracts';
import {
  ApiGatewayLambdaCompleteTriggerType,
  ApiGatewayTriggerArgs,
} from 'contracts/apiGateway/types';
import {
  EventBridgeLambdaTrigger,
  EventBridgeTriggerArgs,
} from 'contracts/eventBridge/types';
import { ServerlessContract } from 'types';

export function getTrigger<Contract extends GenericApiGatewayContract>(
  contract: Contract,
  ...[additionalConfig]: ApiGatewayTriggerArgs<Contract>
): ApiGatewayLambdaCompleteTriggerType<Contract>;

export function getTrigger<Contract extends EventBridgeContract>(
  contract: Contract,
  additionalConfig: EventBridgeTriggerArgs,
): EventBridgeLambdaTrigger<Contract>;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getTrigger<Contract extends ServerlessContract>(
  contract: Contract,
  additionalConfig?: unknown,
): unknown {
  switch (contract.contractType) {
    case 'apiGateway':
      // @ts-ignore inference is not good enough here, overriding
      return getApiGatewayTrigger(contract, additionalConfig);

    case 'eventBridge':
      // @ts-ignore inference is not good enough here, overriding
      return getEventBridgeTrigger(contract, additionalConfig);

    case 'SQS':
      throw new Error(
        'SQS contract has no trigger. The trigger only need the SQS arn which is independent of the Contract',
      );

    case 'cloudFormation':
      throw new Error('CloudFormation contract has no trigger');

    default:
      // exhaustiveness check
      // eslint-disable-next-line no-case-declarations
      const _neverContract: never = contract;
      console.error('Not implemented for contract', _neverContract);
      throw new Error('Not implemented');
  }
}
