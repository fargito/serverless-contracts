import { getCdkHandlerPath } from '@swarmion/serverless-helpers';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

import { sharedEsbuildConfig } from '@swarmion-with-cdk/serverless-configuration';

export class Health extends Construct {
  public healthFunction: NodejsFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.healthFunction = new NodejsFunction(this, 'Lambda', {
      entry: getCdkHandlerPath(__dirname),
      handler: 'main',
      runtime: Runtime.NODEJS_16_X,
      architecture: Architecture.ARM_64,
      awsSdkConnectionReuse: true,
      bundling: sharedEsbuildConfig,
    });
  }
}
