export interface Alias {
  name: string;
  address: string;
  comment: string;
  tracking_key?: string;
}

export type Aliases = Alias[];
