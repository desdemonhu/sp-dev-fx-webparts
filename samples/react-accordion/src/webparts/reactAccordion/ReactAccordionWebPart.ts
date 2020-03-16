import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField, PropertyPaneButton} from "@microsoft/sp-property-pane";

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
  textColor: string;
  bodyBackgroundColor: string;
  bodyTextColor: string;
  onColorChanged: (color: string) => void;
  onTextColorChanged: (textColor: string) => void;
  onBodyBackgroundColorChanged: (bodyBackgroundColor:string) => void;
  onBodyTextColorChanged: (bodyTextColor: string) => void;
}


export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {
  
 /* protected get disableReactivePropertyChanges(): boolean {
    return true;
    }
    */
  protected resetStyles(){
      this.onColorChange("[theme: themePrimary, default: #0078d7]");
      this.onTextColorChange("[theme: themePrimary, default: #0078d7]");
      this.onBodyBackgroundColorChange("[theme: themeLighterAlt, default: #0078d7]");
      this.onBodyTextColorChange("[theme: bodyText, default: #0078d7]");
    }

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

  protected onTextColorChange(textColor: any) {
    update(
      this.properties,
      "textColor",
      (): any => {
        return textColor;
      }
      );
      this.render();
      }

  protected onBodyBackgroundColorChange(bodyBackgroundColor: any) {
    update(
      this.properties,
      "bodyBackgroundColor",
      (): any => {
        return bodyBackgroundColor;
      }
      );
      this.render();
      }

  protected onBodyTextColorChange(bodyTextColor: any) {
    update(
      this.properties,
      "bodyTextColor",
      (): any => {
        return bodyTextColor;
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
        textColor: this.properties.textColor,
        bodyBackgroundColor: this.properties.bodyBackgroundColor,
        bodyTextColor: this.properties.bodyTextColor,
        label: this.properties.label,
        onColorChanged: this.properties.onColorChanged,
        onTextColorChanged: this.properties.onTextColorChanged,
        onBodyBackgroundColorChanged: this.properties.onBodyBackgroundColorChanged,
        onBodyTextColorChanged: this.onBodyTextColorChange,
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
                  textColor: this.properties.textColor,
                  bodyBackgroundColor: this.properties.bodyBackgroundColor,
                  bodyTextColor: this.properties.bodyTextColor,
                  onColorChanged: this.onColorChange.bind(this),
                  onTextColorChanged: this.onTextColorChange.bind(this),
                  onBodyBackgroundColorChanged: this.onBodyBackgroundColorChange.bind(this),
                  onBodyTextColorChanged: this.onBodyTextColorChange.bind(this),
                  onRender: this.render.bind(this)
                  }),
                new ColorPickerControlProperty('textColor', {
                  key: "TEXT COLOR",
                  label: "Title Text Color",
                  color: this.properties.textColor,
                  textColor: this.properties.textColor,
                  bodyBackgroundColor: this.properties.bodyBackgroundColor,
                  bodyTextColor: this.properties.bodyTextColor,
                  onColorChanged: this.onTextColorChange.bind(this),
                  onTextColorChanged: this.onTextColorChange.bind(this),
                  onBodyBackgroundColorChanged: this.onBodyBackgroundColorChange.bind(this),
                  onBodyTextColorChanged: this.onBodyTextColorChange.bind(this),
                  onRender: this.render.bind(this)
                  }),
                new ColorPickerControlProperty('bodyBackgroundColor', {
                  key: "BODY BACKGROUND COLOR",
                  label: "Body Background Color",
                  color: this.properties.bodyBackgroundColor,
                  textColor: this.properties.textColor,
                  bodyBackgroundColor: this.properties.bodyBackgroundColor,
                  bodyTextColor: this.properties.bodyTextColor,
                  onColorChanged: this.onBodyBackgroundColorChange.bind(this),
                  onTextColorChanged: this.onTextColorChange.bind(this),
                  onBodyBackgroundColorChanged: this.onBodyBackgroundColorChange.bind(this),
                  onBodyTextColorChanged: this.onBodyTextColorChange.bind(this),
                  onRender: this.render.bind(this)
                  }),
                new ColorPickerControlProperty('bodyTextColor', {
                  key: "BODY TEXT COLOR",
                  label: "Body Text Color",
                  color: this.properties.bodyTextColor,
                  textColor: this.properties.textColor,
                  bodyBackgroundColor: this.properties.bodyBackgroundColor,
                  bodyTextColor: this.properties.bodyTextColor,
                  onColorChanged: this.onBodyTextColorChange.bind(this),
                  onTextColorChanged: this.onTextColorChange.bind(this),
                  onBodyBackgroundColorChanged: this.onBodyBackgroundColorChange.bind(this),
                  onBodyTextColorChanged: this.onBodyTextColorChange.bind(this),
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
                PropertyPaneButton('resetStyle', {
                  text: "Reset Styles",
                  onClick: this.resetStyles.bind(this)
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
