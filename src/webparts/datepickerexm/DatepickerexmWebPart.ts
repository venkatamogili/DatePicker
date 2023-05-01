import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'DatepickerexmWebPartStrings';
import Datepickerexm from './components/Datepickerexm';
import { IDatepickerexmProps } from './components/IDatepickerexmProps';

export interface IDatepickerexmWebPartProps {
  description: string;
  context:any;
}

export default class DatepickerexmWebPart extends BaseClientSideWebPart<IDatepickerexmWebPartProps> {

  

  public render(): void {
    const element: React.ReactElement<IDatepickerexmProps> = React.createElement(
      Datepickerexm,
      {
        description: this.properties.description,
        context:this.context
        
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
