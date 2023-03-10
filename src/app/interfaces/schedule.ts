export interface Schedule {
  chatIDs: string[];
  clientID: string;
  message: string;
  status: string;
  date: string | Date;
  _id: string;
}
