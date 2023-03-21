export interface Task{
  name: string | null | undefined
  chatIDs: string[] | null | undefined;
  cronJob: string | null | undefined;
  message: string | null | undefined;
  clientID?: string;
  _id?: string;
  isRunning?: boolean;
}
