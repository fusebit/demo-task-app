import { Request, Response } from 'express';

class DAO {
  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    if (this.req.headers.cookie) {
      const data = this.req.headers.cookie
        .split(';')
        .find(item => item.includes('sample-app'))
        .split('=')[1]
        .split('%3D')[0];
      const dataString = Buffer.from(data, 'base64').toString();
      this.data = JSON.parse(dataString);
    } else {
      this.data = {
        users: undefined,
        currentUserId: undefined,
        tasks: undefined,
        configuration: undefined
      }
    }
  }
  private req: Request;
  private res: Response;
  private data: Data;

  getData = <T extends DataKey>(key: T): Data[T] => {
    return this.data[key];
  }
  saveData = <T extends DataKey>(key: T, data: Data[T]): void => {
    this.data[key] = data;
    const encodedCookieString = Buffer.from(JSON.stringify(this.data)).toString('base64');
    this.res.cookie('sample-app', encodedCookieString, {path: '/'});
  }
  clearData = () => {
    this.data = {
      currentUserId: undefined,
      users: undefined,
      configuration: this.data.configuration,
      tasks: undefined
    };
    const encodedCookieString = Buffer.from(JSON.stringify(this.data)).toString('base64');
    this.res.cookie('sample-app', encodedCookieString, { path: '/' });
  }
}

export default DAO;

