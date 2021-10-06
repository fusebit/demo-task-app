export enum IntegrationTypeEnum {
  slack = 'slack',
  hubspot = 'hubspot',
}

export const DataKeyMap: DataKeyMap = {
  configuration: 'configuration',
  currentUserId: 'currentUserId',
  users: 'users',
  tasks: 'tasks',
};

// Replace each value with a valid integration id
export const IntegrationTypeIdMap = {
  [IntegrationTypeEnum.slack]: 'slack-integration',
  [IntegrationTypeEnum.hubspot]: 'hubspot-integration',
};
export const AssertsIsKeyOf: <T extends string>(key: string, map: Record<T, any>) => asserts key is T = (
  input
) => {
  if (!Object.keys(IntegrationTypeIdMap).includes(input)) {
    throw `Invalid Integration Type ${input}`;
  }
};
