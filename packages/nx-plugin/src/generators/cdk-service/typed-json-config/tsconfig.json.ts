import { joinPathFragments } from '@nx/devkit';

import { NormalizedSchema, TsConfig } from '../../types';

export const packageTsConfig = (options: NormalizedSchema): TsConfig => ({
  extends: joinPathFragments(options.offsetFromRoot, 'tsconfig.options.json'),
  compilerOptions: {
    baseUrl: '.',
    emitDeclarationOnly: false,
    noEmit: true,
  },
  references: [
    {
      path: joinPathFragments(
        options.offsetFromRoot,
        'packages/cdk-configuration/tsconfig.build.json',
      ),
    },
  ],
  exclude: ['./cdk.out'],
  include: ['./**/*.ts'],
  'ts-node': {
    transpileOnly: true,
  },
});
