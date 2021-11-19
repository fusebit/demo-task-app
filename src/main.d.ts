interface Config {
  FUSEBIT_INTEGRATION_URL: string;
  FUSEBIT_JWT: string;
  SLACK_INTEGRATION_ID?: string;
  HUBSPOT_INTEGRATION_ID?: string;
}

interface User {
  userId: string;
  color?: string;
  name: string;
  index: number;
}

interface Task {
  name: string;
  description: string;
  index?: number;
}

interface TaskMap {
  [key: string]: Task[];
}

type IntegrationType = 'SLACK' | 'HUBSPOT';

interface IntegrationMap<T> extends Partial<Record<IntegrationType, T>> {}

interface IntegrationIdMap extends IntegrationMap<string> {}

interface UserData {
  currentUserId: string;
  users: Users;
  integrations: IntegrationMap<any>;
  integrationTypes: IntegrationType[];
}

interface Users {
  [key: string]: User;
}
interface Tasks {
  [key: string]: Task[];
}

interface Data {
  users: Users;
  tasks: Tasks;
  currentUserId: string;
  configuration: Config;
}

type DataKey = keyof Data;

type DataKeyMap = {
  [key in keyof Data]: key;
};

type IntegrationTypeKeyMap = {
  [key in IntegrationType]: key;
};

type IntegrationIdKeyMap = {
  [key in IntegrationType]: string;
};
