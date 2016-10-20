export enum ConnectionStatus {CONNECTING, CONNECTED, DISCONNECTING, DISCONNECTED, ERROR, WARNING};
export interface Connection {
  name: string;
  status: ConnectionStatus;
  tags?: string[];
}
