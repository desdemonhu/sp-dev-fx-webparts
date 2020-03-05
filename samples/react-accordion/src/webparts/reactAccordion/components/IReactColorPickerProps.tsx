import * as React from 'react';
import { createRef } from "office-ui-fabric-react/lib/Utilities";
import { ColorPicker } from "office-ui-fabric-react/lib/components/ColorPicker";
import { Callout } from "office-ui-fabric-react/lib/Callout";


export default class ColorPickerControl extends React.Component<IColorPickerControlProps,IColorPickerControlState> 
{
private menuButtonElement = createRef<HTMLElement>();

// handles color change
public colorChanged(color: string) {
    this.props.onColorChanged(color);
    this.setState({
    color
    });
    }
    
//handles state change to show and hide callout
public setCalloutVisible() {
this.setState({
isCalloutVisible: true
});
}

public dismissCallout() {
this.setState({
isCalloutVisible: !this.state.isCalloutVisible
});
}

constructor(props: IColorPickerControlProps) {
    super(props);
    //Bind the current object to the external called method
    this.colorChanged = this.colorChanged.bind(this);
    this.setCalloutVisible = this.setCalloutVisible.bind(this);
    this.dismissCallout = this.dismissCallout.bind(this);
    //Initialize the state
    
    this.state = {
    color: props.color,
    isCalloutVisible: false};
    }

public render(): React.ReactElement<IColorPickerControlProps> {
    const miniButtonStyle = {
        width: "40px",
        height: "20px",
        padding: "6px",
        backgroundColor: this.state.color,
        borderRadius: "5px",
        boxShadow: "2px 2px 2px black"
        };
return (<div>
    <label style={{ fontWeight: 600 }}>{this.props.label}</label>
<div
ref={this.menuButtonElement}
style={miniButtonStyle}
onClick={this.setCalloutVisible}
id="colorpicker"
/>
{this.state.isCalloutVisible && (
<Callout
className={"ms-CalloutExample-callout"}
gapSpace={0}
target={this.menuButtonElement.value}
setInitialFocus={true}
hidden={!this.state.isCalloutVisible}
onDismiss={this.dismissCallout}
>
<ColorPicker
color={this.state.color}
onColorChanged={e => this.colorChanged(e)}
alphaSliderHidden={true}
/>
</Callout>
)}
 </div>   
    );
}
}

export interface IColorPickerControlProps {
    label: string;
    color: string;
    onColorChanged: (color: string) => void;
    }
export interface IColorPickerControlState {
    color: string;
    isCalloutVisible: boolean;
    }