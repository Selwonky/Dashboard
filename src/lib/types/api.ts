export type ApiSuccess<T> = {
  status: "success";
  data?: T;
  id?: number;
  deleted?: boolean;
  message?: string;
};

export type ApiListSuccess<T> = {
  status: "success";
  data: T[];
  count: number;
  limit: number;
  offset: number;
};

export type ApiCreateSuccess<T> = {
  status: "success";
  id: number;
  data: T;
};

export type ApiDeleteSuccess = {
  status: "success";
  deleted: true;
  id: number;
};

export type ApiUnavailable = {
  status: "unavailable";
  model: string;
  data: [];
  error: string;
};

export type ApiError = {
  status: "error";
  detail: string;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiListSuccess<T> | ApiError | ApiUnavailable;

export type ContractStatus = "live" | "pending";
export type DataSource = "api" | "prototype";

export type SurfaceContract = {
  source: DataSource;
  contractStatus: ContractStatus;
  route?: string;
};
