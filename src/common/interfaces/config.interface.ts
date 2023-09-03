import { Algorithm } from '../enum/algotithm.enum';

export interface IConfig {
  nest: NestConfig;
  security: SecurityConfig;
  swagger: SwaggerConfig;
}

export interface NestConfig {
  port: number;
}

export interface SecurityConfig {
  expiresIn: string;
  bcryptSaltOrRound: number;
  algorithm: Algorithm;
}

export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tag: string;
}
