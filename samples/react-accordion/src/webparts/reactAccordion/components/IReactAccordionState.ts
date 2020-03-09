import IAccordionListItem from '../models/IAccordionListItem';

export interface IReactAccordionState {
  status: string;
  items: IAccordionListItem[];
  listItems: IAccordionListItem[];
  isLoading: boolean;
  loaderMessage: string;
  color: string;
  textColor: string;
  onColorChanged: any;
  onTextColorChanged: any;
}