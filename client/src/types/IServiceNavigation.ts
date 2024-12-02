export interface IServiceNavigation {
  prevService?: string;
  nextService?: string;
  onClickPrevService: () => void;
  onClickNextService: () => void;
}
