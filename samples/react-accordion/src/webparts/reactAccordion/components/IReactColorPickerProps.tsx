import * as React from 'react';
import { createRef } from "office-ui-fabric-react/lib/Utilities";
import { ColorPicker } from "office-ui-fabric-react/lib/components/ColorPicker";
import { Callout } from "office-ui-fabric-react/lib/Callout";
import {IColorPickerControlProps, IColorPickerControlState} from './IReactColorPickerProps';


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

public textColorChanged(textColor: string) {
    this.props.onTextColorChanged(textColor);  
    this.setState({
        textColor
        });
}
        
//handles state change to show and hide callout
public setCalloutVisible() {
this.setState({
isCalloutVisible: true
});
}

public setTextCalloutVisible() {
    this.setState({
    isTextCalloutVisible: true
    });
    }

public dismissCallout() {
this.setState({
isCalloutVisible: !this.state.isCalloutVisible
});
}

public dismissTextCallout() {
    this.setState({
    isTextCalloutVisible: !this.state.isTextCalloutVisible
    });
    }

constructor(props: IColorPickerControlProps) {
    super(props);
    //Bind the current object to the external called method
    this.colorChanged = this.colorChanged.bind(this);
    this.textColorChanged = this.textColorChanged.bind(this);
    this.setCalloutVisible = this.setCalloutVisible.bind(this);
    this.dismissCallout = this.dismissCallout.bind(this);
    //Initialize the state
    
    this.state = {
    color: props.color,
    textColor: props.textColor,
    isCalloutVisible: false,
    isTextCalloutVisible: false};
    }

public render(): React.ReactElement<IColorPickerControlProps>{
const miniButtonStyle = {
    width: "40px",
    height: "20px",
    padding: "6px",
    backgroundColor: this.state.color,
    color: this.state.textColor,
    borderRadius: "5px",
    boxShadow: "2px 2px 2px black"
    };
    
return(
     <div>
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

{this.state.isTextCalloutVisible && (
<Callout
className={"ms-CalloutExample-callout"}
gapSpace={0}
target={this.menuButtonElement.value}
setInitialFocus={true}
hidden={!this.state.isTextCalloutVisible}
onDismiss={this.dismissTextCallout}>
<ColorPicker
color={this.state.textColor}
onColorChanged={ e => this.textColorChanged(e)}
alphaSliderHidden={true}
/>
</Callout>
)}
 </div>);
    }
}


export interface IColorPickerControlProps {
    label: string;
    color: string;
    textColor: string;
    onColorChanged: (color: string) => void;
    onTextColorChanged: (textColor: string) => void;
    }
export interface IColorPickerControlState {
    color: string;
    textColor: string;
    isCalloutVisible: boolean;
    isTextCalloutVisible: boolean;
    }