import * as React from 'react';
import { AccordionItemTitle} from 'react-accessible-accordion';

export default class AccordionItemTitleOverwrite extends React.Component {
public render(){
        let injectedProps;
        injectedProps.style = '[theme: themePrimary, default: #0078d7]';

        return (<AccordionItemTitle {...this.props} {...injectedProps}></AccordionItemTitle>);
    }
}