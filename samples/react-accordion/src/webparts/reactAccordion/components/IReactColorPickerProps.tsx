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

public bodyBackgroundColorChanged(bodyBackgroundColor:string){
    this.props.onBodyBackgroundColorChanged(bodyBackgroundColor);
    this.setState({
        bodyBackgroundColor
    });
}

public bodyTextColorChanged(bodyTextColor:string){
    this.props.onBodyTextColorChanged(bodyTextColor);
    this.setState({
        bodyTextColor
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

public setBodyBackgroundColorCalloutVisible() {
    this.setState({
    isBodyBackgroundColorCalloutVisible: true
});
}

public setBodyTextColorCalloutVisible() {
    this.setState({
    isBodyTextColorCalloutVisible: true
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

public dismissBodyBackgroundColorCallout() {
    this.setState({
    isBodyBackgroundColorCalloutVisible: !this.state.isBodyBackgroundColorCalloutVisible
});
}

public dismissBodyTextColorCallout() {
    this.setState({
    isBodyTextColorCalloutVisible: !this.state.isBodyTextColorCalloutVisible
});
}

constructor(props: IColorPickerControlProps) {
    super(props);
    //Bind the current object to the external called method
    this.colorChanged = this.colorChanged.bind(this);
    this.textColorChanged = this.textColorChanged.bind(this);
    this.bodyBackgroundColorChanged = this.bodyBackgroundColorChanged.bind(this);
    this.bodyTextColorChanged = this.bodyTextColorChanged.bind(this);

    this.setCalloutVisible = this.setCalloutVisible.bind(this);
    this.dismissCallout = this.dismissCallout.bind(this);

    this.setTextCalloutVisible = this.setTextCalloutVisible.bind(this);
    this.dismissTextCallout = this.dismissTextCallout.bind(this);

    this.setBodyBackgroundColorCalloutVisible = this.setBodyBackgroundColorCalloutVisible.bind(this);
    this.dismissBodyBackgroundColorCallout = this.dismissBodyBackgroundColorCallout.bind(this);

    this.setBodyTextColorCalloutVisible = this.setBodyTextColorCalloutVisible.bind(this);
    this.dismissBodyTextColorCallout = this.dismissBodyTextColorCallout.bind(this);
    

    //Initialize the state
    
    this.state = {
    color: props.color,
    textColor: props.textColor,
    bodyBackgroundColor: props.bodyBackgroundColor,
    bodyTextColor: props.bodyTextColor,    
    isCalloutVisible: false,
    isTextCalloutVisible: false,
    isBodyBackgroundColorCalloutVisible: false,
    isBodyTextColorCalloutVisible: false
};
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

const miniBodyButtonStyle = {
    width: "40px",
    height: "20px",
    padding: "6px",
    backgroundColor: this.state.bodyBackgroundColor,
    color: this.state.bodyTextColor,
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

{this.state.isBodyBackgroundColorCalloutVisible && (
    <Callout
    className={"ms-CalloutExample-callout"}
    gapSpace={0}
    target={this.menuButtonElement.value}
    setInitialFocus={true}
    hidden={!this.state.isBodyBackgroundColorCalloutVisible}
    onDismiss={this.dismissBodyBackgroundColorCallout}>
    <ColorPicker
    color={this.state.bodyBackgroundColor}
    onColorChanged={ e => this.bodyBackgroundColorChanged(e)}
    alphaSliderHidden={true}
    />
    </Callout>
    )}

    {this.state.isBodyTextColorCalloutVisible && (
    <Callout
    className={"ms-CalloutExample-callout"}
    gapSpace={0}
    target={this.menuButtonElement.value}
    setInitialFocus={true}
    hidden={!this.state.isBodyTextColorCalloutVisible}
    onDismiss={this.dismissBodyTextColorCallout}>
    <ColorPicker
    color={this.state.bodyTextColor}
    onColorChanged={ e => this.bodyTextColorChanged(e)}
    alphaSliderHidden={true}
    />
    </Callout>
    )}
</div>);
}}


export interface IColorPickerControlProps {
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
export interface IColorPickerControlState {
    color: string;
    textColor: string;
    bodyBackgroundColor: string;
    bodyTextColor: string;
    isCalloutVisible: boolean;
    isTextCalloutVisible: boolean;
    isBodyBackgroundColorCalloutVisible: boolean;
    isBodyTextColorCalloutVisible: boolean;
    }