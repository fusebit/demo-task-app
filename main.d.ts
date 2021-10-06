interface Config {
  BASE_INTEGRATION_URL: string;
  FUSEBIT_JWT: string;
  APP_URL: string;
  INTEGRATION_ID_MAP: Record<IntegrationType, string>;
}

interface User {
  userId: string;
  name: string;
  index: number;
}

interface Task {
  name: string;
  description: string;
  index?: number;
}

type IntegrationType = 'slack' | 'hubspot';

interface UserData {
  currentUserId: string;
  users: Users;
  integrations: Partial<Record<IntegrationType, any>>;
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
