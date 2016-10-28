import {ConnectionStatus} from './connection-status';
export interface Connection {
  name: string;
  host: string;
  port: number;
  username?: string;
  privateKey?: string;
  status: ConnectionStatus;
  tags?: string[];
}
