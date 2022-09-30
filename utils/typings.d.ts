export interface UseRequest {
  url: string;
  method: string;
  body?: any;
  onSuccess?: (data?: any) => void;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITicket {
  id: string;
  userId: string;
  title: string;
  price: number;
  version: number;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: string;
  userId: string;
  version: number;
  status: string;
  expiresAt: Date;
  ticket: ITicket;
  createdAt: Date;
  updatedAt: Date;
}
