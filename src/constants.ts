export const IntegrationTypeEnum: IntegrationTypeKeyMap = {
  SLACK_BOT: {
    value: 'SLACK_BOT',
    action: 'Get slack notifications when a new task is created.',
    taskDoneText: 'A message is being sent to your slack account.',
    taskDescription:
      'In this example, the "Add New Task" Button, if installed, will use your integration code to immediately update your user via Slack! Look at the code to see how it works, and learn more in the docs here.',
  },
  HUBSPOT: {
    value: 'HUBSPOT',
    action: 'Sync your hubspot task list here.',
  },
};

export const DataKeyMap: DataKeyMap = {
  configuration: 'configuration',
  currentUserId: 'currentUserId',
  currentTenantId: 'currentTenantId',
  users: 'users',
  tasks: 'tasks',
};

export const AssertsIsKeyOf: <T extends string>(key: string, map: Record<T, any> & object) => asserts key is T = (
  input,
  map
) => {
  if (!Object.keys(map).includes(input)) {
    throw `Invalid Integration Type ${input}`;
  }
};

export const AssertIntegrationName: (integrationName: string) => asserts integrationName is IntegrationType = (
  integrationName
) => {
  AssertsIsKeyOf(integrationName, IntegrationTypeEnum);
};

export const urlOrSvgToImage = (img = '') =>
  img.match('^<svg') ? `data:image/svg+xml;utf8,${encodeURIComponent(img)}` : img;

export const toKebabCase = (text: string) => {
  const kebabCaseText = text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace('@', '-')
    .toLowerCase();

  return kebabCaseText;
};
