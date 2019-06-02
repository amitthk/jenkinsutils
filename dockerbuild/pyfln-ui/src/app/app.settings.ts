import { environment } from '../environments/environment';

export class AppSettings {
    public static envEndpoints = new Map([['local', 'http://localhost:8997/'],
    [ 'dev', '/api/'], [ 'sit', '/api/'],
    [ 'uat', '/api/'], [ 'prod', '/api/']]);
    public static API_ENDPOINT = AppSettings.envEndpoints.get(environment.env);
  }
