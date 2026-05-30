export type ApiSuccess<T> = {
  status: "success";
  data?: T;
  id?: number;
  deleted?: boolean;
  message?: string;
};

export type ApiError = {
  status: "error";
  detail: string;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;

export type ContractStatus = "live" | "pending";
export type DataSource = "api" | "prototype";

export type SurfaceContract = {
  source: DataSource;
  contractStatus: ContractStatus;
  route?: string;
};
