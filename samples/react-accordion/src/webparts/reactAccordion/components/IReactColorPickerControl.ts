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
onColorChanged: (color: string) => void;
onTextColorChanged: (textColor: string) => void;
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
onColorChanged: properties.onColorChanged,
onTextColorChanged: properties.onTextColorChanged,
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
onColorChanged: this.properties.onColorChanged,
onTextColorChanged: this.properties.onTextColorChanged
});
ReactDom.render(element, elem);
}
}