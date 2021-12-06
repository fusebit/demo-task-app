import { Request, Response } from 'express';
import { DataKeyMap, IntegrationTypeEnum } from '../../constants';

class DAO {
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    const cookieList = this.req.headers.cookie ? this.req.headers.cookie
      .split(';') : [];
    const sampleAppCookie = cookieList.find(cookie => cookie.includes('sample-app'));

    if (sampleAppCookie) {
      const data = sampleAppCookie.split('=')[1].split('%3D')[0];
      const dataString = Buffer.from(data, 'base64').toString();
      this.data = JSON.parse(dataString);
    } else {
      this.data = {
        users: undefined,
        currentUserId: undefined,
        tasks: undefined,
        configuration: undefined,
      };
    }
  }
  private req: Request;
  private res: Response;
  private data: Data;

  getData = <T extends DataKey>(key: T): Data[T] => {
    return this.data[key];
  };
  saveData = <T extends DataKey>(key: T, data: Data[T]): void => {
    this.data[key] = data;
    const encodedCookieString = Buffer.from(JSON.stringify(this.data)).toString('base64');
    this.res.cookie('sample-app', encodedCookieString, { path: '/' });
  };
  clearData = () => {
    this.data = {
      currentUserId: undefined,
      users: undefined,
      configuration: this.data.configuration,
      tasks: undefined,
    };
    const encodedCookieString = Buffer.from(JSON.stringify(this.data)).toString('base64');
    this.res.cookie('sample-app', encodedCookieString, { path: '/' });
  };

  clearTasks = (userId: string) => {
    this.data = {
      ...this.data,
      tasks: {
        ...this.data.tasks,
        [userId]: []
      },
    };

    const encodedCookieString = Buffer.from(JSON.stringify(this.data)).toString('base64');
    this.res.cookie('sample-app', encodedCookieString, { path: '/' });
  };

  getUsers = () => {
    return this.getData(DataKeyMap.users) || {};
  };

  setUsers = (users: Users) => {
    this.saveData(DataKeyMap.users, users);
  };

  getCurrentUserId = () => {
    return this.getData(DataKeyMap.currentUserId);
  };

  setCurrentUserId = (currentUserId: string) => {
    this.saveData(DataKeyMap.currentUserId, currentUserId);
  };

  getConfiguration = () => {
    return this.getData(DataKeyMap.configuration);
  };

  setConfiguration = (config: Config) => {
    this.saveData(DataKeyMap.configuration, config);
  };

  getTasks = () => {
    return this.getData(DataKeyMap.tasks) || {};
  };

  setTasks = (tasks: TaskMap) => {
    this.saveData(DataKeyMap.tasks, tasks);
  };

  getEnabledIntegrationIds = () => {
    return this.getEnabledIntegrationTypes().map((integrationType: IntegrationType) =>
      this.getIntegrationId(integrationType)
    );
  };

  getEnabledIntegrationTypes = () => {
    const configuration = this.getConfiguration();
    return Object.keys(IntegrationTypeEnum).filter(
      (integrationType: IntegrationType) => !!configuration[`${integrationType}_INTEGRATION_ID`]
    );
  };

  getIntegrationId = (integrationType: IntegrationType) => {
    const configuration = this.getConfiguration();
    const id = configuration[`${integrationType}_INTEGRATION_ID`];
    if (!id) {
      throw `Integration ${integrationType} wasn't found`
    }
    return id
  };
}

export default DAO;
