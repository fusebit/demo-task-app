interface Config {
  FUSEBIT_INTEGRATION_URL: string;
  FUSEBIT_JWT: string;
  SLACK_BOT_INTEGRATION_ID?: string;
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

type IntegrationType = 'SLACK_BOT' | 'HUBSPOT';

interface Feed {
  id: string;
  name: string;
  description: string;
  smallIcon: string;
  largeIcon: string;
  version: string;
  outOfPlan: boolean;
  envPrefix?: string;
  integrationId?: string;
  tags: {
    service: string;
    catalog: string;
  };
  sampleConfig: {
    enabled?: boolean;
    imageSvg: string;
    getEnabled?: boolean;
    postEnabled?: boolean;
    taskDoneText?: string
  }
}

interface IntegrationMap<T> extends Partial<Record<IntegrationType, T>> {}

interface IntegrationIdMap extends IntegrationMap<string> {}

interface UserData {
  currentUserId: string;
  users: Users;
  integrations: Record<string, any>;
  integrationTypes: IntegrationType[];
  integrationList: {
    available: Feed[];
    unavailable: Feed[];
  }
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

type IntegrationInfo<T = string> = {
  value: T;
  action: string;
  taskDoneText?: string;
  taskDescription?: string;
}

type IntegrationTypeKeyMap = {
  [key in IntegrationType]: IntegrationInfo<key>;
};

type IntegrationIdKeyMap = {
  [key in IntegrationType]: string;
};
