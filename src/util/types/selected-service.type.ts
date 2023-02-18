import { ObjectId } from 'mongodb';

export type SelectedServiceType = {
  idStoreService: ObjectId;
  idStaff: ObjectId;
  tip: number;
};
