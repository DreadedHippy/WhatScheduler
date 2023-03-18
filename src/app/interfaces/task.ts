export interface Task{
  name: string | null | undefined;
  message: string | null | undefined;
  cronString: string | null | undefined;
  chatIDs: string[] | null | undefined;
}
