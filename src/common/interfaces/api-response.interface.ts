export interface Response<T> {
  statusCode: number;
  message?: string;
  data: T;
}

export interface DataOutput<T> {
  message?: string;
  output: T;
}
