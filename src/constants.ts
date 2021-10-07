export const IntegrationTypeEnum: IntegrationTypeKeyMap = {
  SLACK: 'SLACK',
  HUBSPOT: 'HUBSPOT',
};

export const DataKeyMap: DataKeyMap = {
  configuration: 'configuration',
  currentUserId: 'currentUserId',
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
