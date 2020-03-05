import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField} from "@microsoft/sp-property-pane";

import { SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'ReactAccordionWebPartStrings';
import ReactAccordion from './components/ReactAccordion';
import { IReactAccordionProps } from './components/IReactAccordionProps';
import { update } from "@microsoft/sp-lodash-subset";
import {ColorPickerControlProperty} from './components/IReactColorPickerControl';

export interface IReactAccordionWebPartProps {
  key: string;
  description: string;
  listName: string;
  label: string;
  choice: string;
  title: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  updateProperty: (value: string) => void;
  displayMode: DisplayMode;
  maxItemsPerPage: number;
  color: string;
  onColorChanged: (color: string) => void;
}


export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {
 /* protected get disableReactivePropertyChanges(): boolean {
    return true;
    }
    */

   protected onColorChange(color: any) {
    update(
    this.properties,
    "color",
    (): any => {
      return color;
    }
    );
    this.render();
    }

  public render(): void {
    const element: React.ReactElement<IReactAccordionProps> = React.createElement(
      ReactAccordion,
      {
        listName: this.properties.listName,
        key: this.properties.key,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        color: this.properties.color,
        label: this.properties.label,
        onColorChanged: this.properties.onColorChanged,
        updateProperty: this.properties.updateProperty,
        onRender: this.render.bind(this)
    }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                }),
                new ColorPickerControlProperty('color', {
                  key: "COLOR PICKER",
                  label: "Title Background Color",
                  color: this.properties.color,
                  onColorChanged: this.onColorChange.bind(this),
                  onRender: this.render.bind(this)
                  }),
                PropertyPaneSlider('maxItemsPerPage', {
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
