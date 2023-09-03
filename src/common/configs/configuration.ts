import { Algorithm } from '../enum/algotithm.enum';
import { IConfig } from '../interfaces/config.interface';

const config: IConfig = {
  nest: { port: 3000 },
  security: {
    expiresIn: '1d',
    bcryptSaltOrRound: 10,
    algorithm: Algorithm.HS256,
  },
  swagger: {
    title: 'Test example',
    description: 'Test API description',
    version: '1.0',
    tag: 'test_task',
  },
};

export default (): IConfig => config;
