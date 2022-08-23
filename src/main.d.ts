type Config = Record<string, string>;
interface User {
  userId: string;
  color?: string;
  name: string;
  index: number;
}

type Task = Record<string, string>;

interface TaskMap {
  [key: string]: Task[];
}

type IntegrationType = 'SLACK_BOT' | 'HUBSPOT';

interface Install {
  id: string;
  parentId: string;
}

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
  resources: {
    configureAppDocUrl: string;
    sampleConfig?: {
      isEnabled?: boolean;
      isGetEnabled?: boolean;
      isPostEnabled?: boolean;
      terms?: {
        postSuccess?: string;
        postFail?: string;
        getFail?: string;
        itemName?: string;
        itemNamePlural?: string;
        properties?: {
          name?: string;
          label?: string;
        }[];
      };
    };
  };
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
  };
  list?: (Feed & {
    integrationId: string;
    feedId: string;
    isInstalled: boolean;
    title: string;
  })[];
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
  currentTenantId: string;
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
};

type IntegrationTypeKeyMap = {
  [key in IntegrationType]: IntegrationInfo<key>;
};

type IntegrationIdKeyMap = {
  [key in IntegrationType]: string;
};
