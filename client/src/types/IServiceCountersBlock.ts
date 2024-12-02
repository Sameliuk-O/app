export interface IServiceCountersBlock {
  service?: string;
  classNameButton?: string;
  classNameDescription?: string;
  classNameBlockDescription?: string;
  displayTitle?: boolean;
  sendAllCounters?: boolean;
  setSendAllCounters?: (value: boolean) => void;
  serviceName?: string;
  isSendAllData?: boolean;
  setIsSendAllData?: (value: boolean) => void;
}
