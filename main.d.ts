interface Config {
  INTEGRATION_URL: string;
  INTEGRATION_NAME: string;
  FUSEBIT_JWT: string;
  APP_URL: string;
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

interface UserData {
  currentUserId: string;
  users: Users;
  integration: any;
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
