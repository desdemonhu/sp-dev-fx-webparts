import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
IPropertyPaneField,PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import ColorPickerControl,{IColorPickerControlProps} from './IReactColorPickerProps';

export interface ColorPickerControlInternalProps extends  IPropertyPaneCustomFieldProps {
onRender: any;
label: string;
color: string;
textColor: string;
bodyBackgroundColor: string;
bodyTextColor: string;
onColorChanged: (color: string) => void;
onTextColorChanged: (textColor: string) => void;
onBodyBackgroundColorChanged: (bodyBackgroundColor: string) => void;
onBodyTextColorChanged: (bodyTextColor: string) => void;
}

export class ColorPickerControlProperty implements IPropertyPaneField<ColorPickerControlInternalProps> {
public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
public targetProperty: string;
public properties: ColorPickerControlInternalProps;
private elem: HTMLElement;

constructor(targetProperty: string, properties: ColorPickerControlInternalProps) {
this.targetProperty = targetProperty;
this.properties = {
key: properties.key,
label: properties.label,
color: properties.color,
textColor: properties.textColor,
bodyBackgroundColor: properties.bodyBackgroundColor,
bodyTextColor: properties.bodyTextColor,
onColorChanged: properties.onColorChanged,
onTextColorChanged: properties.onTextColorChanged,
onBodyBackgroundColorChanged: properties.onBodyBackgroundColorChanged,
onBodyTextColorChanged: properties.onBodyTextColorChanged,
onRender: this.onRender.bind(this)
};
}

public render(): void {
if (!this.elem) {return;}

this.onRender(this.elem);
}

private onRender(elem: HTMLElement): void {
if (!this.elem) {this.elem = elem;}

//Render the property in our PropertyPane
const element: React.ReactElement<IColorPickerControlProps> = React.createElement(ColorPickerControl, {
key: this.properties.key,
label: this.properties.label,
color: this.properties.color,
textColor: this.properties.textColor,
bodyBackgroundColor: this.properties.bodyBackgroundColor,
bodyTextColor: this.properties.bodyTextColor,
onColorChanged: this.properties.onColorChanged,
onTextColorChanged: this.properties.onTextColorChanged,
onBodyBackgroundColorChanged: this.properties.onBodyBackgroundColorChanged,
onBodyTextColorChanged: this.properties.onBodyTextColorChanged
});
ReactDom.render(element, elem);
}
}