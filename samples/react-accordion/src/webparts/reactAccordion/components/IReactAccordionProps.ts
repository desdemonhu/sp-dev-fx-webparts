import { SPHttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';
import {IColorPickerControlProps} from './IReactColorPickerProps';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

export interface IReactAccordionProps extends IPropertyPaneCustomFieldProps, IColorPickerControlProps {
  listName: string;
  key: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  title: string;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  updateProperty: (value: string) => void;
}
