export interface IBasicResponse<T = any> {
  data?: T;
  status?: ResponseStatusMessage;
  count?: number;
  errorMessage?: any;
}

export enum ResponseStatusMessage {
  Success = 'Success',
  Error = 'Error',
}
