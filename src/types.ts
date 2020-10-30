export interface Flag {
  id: string;
  label: string;
  description: string;
  threshold: number;
  "self-select": boolean;
  enabled: boolean;
  deprecated: boolean;
  expires: string;
  selectors: any;
}
