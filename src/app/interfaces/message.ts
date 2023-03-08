export interface Message {
  chatIDs: string[] | null | undefined;
  message: string| null | undefined;
  isInstant: boolean | null | undefined;
  date: Date | string | undefined | null | undefined;
}
