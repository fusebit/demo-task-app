export enum IntegrationType {
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
  [IntegrationType.slack]: 'slack-integration',
  [IntegrationType.hubspot]: 'hubspot-integration',
};
export const AssertsIsIntegrationType: (input: string) => asserts input is keyof typeof IntegrationTypeIdMap = (
  input
) => {
  if (!Object.keys(IntegrationTypeIdMap).includes(input)) {
    throw `Invalid Integration Type ${input}`;
  }
};
