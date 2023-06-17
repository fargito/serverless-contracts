// eslint-disable-next-line import/no-named-as-default
import prompts, { Choice } from 'prompts';

const TEMPLATES = [
  'swarmion-starter',
  'sls',
  'swarmion-with-next',
  'swarmion-bare',
] as const;

export type Template = (typeof TEMPLATES)[number];

const choices: (Omit<Choice, 'value'> & { value: Template })[] = [
  {
    title: 'Swarmion Starter',
    description: 'Simple example with a single Serverless Framework backend',
    value: 'swarmion-starter',
  },
  {
    title: 'Serverless framework full stack',
    description:
      'A complete example with a serverless framework backend, a frontend and a shared lib',
    value: 'sls',
  },
  {
    title: 'Swarmion with Next.js',
    description: 'Example with a backend and a frontend using Next.js',
    value: 'swarmion-with-next',
  },
  {
    title: 'Swarmion Bare',
    description:
      'Minimalist example without any service, start with this for maximum flexibility',
    value: 'swarmion-bare',
  },
];

const isValidTemplate = (template: unknown): template is Template =>
  typeof template === 'string' && TEMPLATES.includes(template as Template);

const getProjectTemplate = async (
  templateOption: unknown,
): Promise<Template> => {
  if (isValidTemplate(templateOption)) {
    return templateOption;
  }

  const templateRes = await prompts({
    type: 'select',
    name: 'template',
    message: 'Choose your starting template',
    choices,
  });

  if (isValidTemplate(templateRes.template)) {
    return templateRes.template;
  } else {
    throw new Error(`The template should be one of : ${TEMPLATES.join(', ')}`);
  }
};

export default getProjectTemplate;
