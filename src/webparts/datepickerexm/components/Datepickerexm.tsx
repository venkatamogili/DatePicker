import * as React from 'react';
//import styles from './Datepickerexm.module.scss';
import { IDatepickerexmProps } from './IDatepickerexmProps';
import { IDatepickerstate } from './IDatepickerstate';
//import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
//import { ChartControl, ChartType } from '@pnp/spfx-controls-react/lib/ChartControl';
import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { PrimaryButton } from 'office-ui-fabric-react';
import * as moment from 'moment';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export default class Datepickerexm extends React.Component<IDatepickerexmProps, IDatepickerstate> {
  constructor(props: IDatepickerexmProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      SelectedDate:null
    }
  }
  onSaveDateTime=()=>{
    // const timeutc=this.state.SelectedDate ? this.state.SelectedDate.utc():null;
    const selectedDateTime = this.state.SelectedDate;
  const selectedDateTimeUtc = selectedDateTime
    ? moment(selectedDateTime).utc().format()
    : null;

    sp.web.lists.getByTitle("activeAlertList").items.add({
      ReleaseDate:selectedDateTimeUtc
    })
    .then((response)=>{
      console.log(`Item ${response.data.ID} created successfull`); 

    }).catch((error)=>{
      console.log("Error",error);
    });
  }
  onDateTimeSaving=(dateTime:any)=>{
    this.setState({SelectedDate:dateTime})
  }
  public render(): React.ReactElement<IDatepickerexmProps> {
return (
      <>
      <DateTimePicker
      label='Select a date and Time'
      dateConvention={DateConvention.DateTime}
      onChange={this.onDateTimeSaving}/>
      <PrimaryButton onClick={this.onSaveDateTime} text='Save Date and Time'/>
      </>
       
    );
  }
}

