import Highcharts, {Options, Chart, SeriesOptionsType, SeriesPackedbubbleOptions, Series } from 'highcharts';
import HC_more from 'highcharts/highcharts-more' //module
HC_more(Highcharts) //init module
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

export interface ISeries {
  name: string;
  data: number[][];
  xAxis?: XAxisOptions;
}

export interface ICardTimeSeries {
  title?: string;
  series: Array<SeriesSplineOptions | any>;
}

export default class Spline {
  private _m_containerId: string;
  private _m_chart: Chart | null = null;
  private _m_series: Array<SeriesSplineOptions> = [
    { type: "spline", name: "", data: [] },
  ];
  private _m_title: string = "";
  private _m_color: string = "#b708e8";
  private _m_units: string = "";
  private screenWidth: number;

  constructor(p_containerId: string) {
    this._m_containerId = p_containerId;
    this.screenWidth = window.screen.width;
  }

  get m_containerId(): string {
    return this._m_containerId;
  }

  set m_containerId(value: string) {
    this._m_containerId = value;
  }

  get m_chart(): Chart | null {
    return this._m_chart;
  }

  set m_chart(value: Chart | null) {
    this._m_chart = value;
  }

  get m_series(): Array<SeriesSplineOptions> {
    return this._m_series;
  }

  set m_series(value: Array<SeriesSplineOptions | any>) {
    if (value.length > 0) {
      this._m_series = value;
      const _length: number = this.m_chart?.series.length || 0;
      Array.from({ length: _length }).forEach(() => {
        this.m_chart?.series[0]?.remove(true);
      });

      value.forEach((_series: SeriesSplineOptions) => {
        this.m_chart?.addSeries(_series as SeriesOptionsType);
      });
    }
  }

  get m_title(): string {
    return this._m_title;
  }

  set m_title(value: string) {
    this._m_title = value;
  }

  get m_color(): string {
    return this._m_color;
  }

  set m_color(value: string) {
    this._m_color = value;
  }

  get m_units(): string {
    return this._m_units;
  }

  set m_units(value: string) {
    this._m_units = value;
  }

  createChart(): void {
    const option = {
      chart: {
          renderTo: this.m_containerId,
          backgroundColor: 'transparent',
          //TODO: packedbubble?? https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/packed-bubble
          type: 'packedbubble',
          // height: '100%',
          style: {
              fontFamily: 'PT Serif'
          }
      },
      title: {
          text: '',
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      legend: {
          enabled: false,
          align: 'left',
          layout: 'vertical',
          verticalAlign: 'top',
          itemMarginTop: 10,
      },
  
      plotOptions: {
          packedbubble: {
              minSize: '10%',
              maxSize: '200%',
              zMin: this._zMin,
              zMax: this._zMax,
              layoutAlgorithm: {
                  // splitSeries: 'true', // By default is false but need a string instead of a boolean
                  gravitationalConstant: 0.02
              },
              dataLabels: {
                  enabled: true,
                  format: '{point.name.name}',
                  filter: {
                      property: 'y',
                      operator: '>',
                      value: this.m_threshold
                  },
                  style: {
                      color: 'black',
                      textOutline: 'none',
                      fontWeight: 'normal'
                  }
              }
          }
      },

      tooltip: {
          useHTML: true,
           pointFormat: 'Name: <b>{point.name}</br> Rating: {point.value}' // Useful if series would be split by groups
          //pointFormat: 'Rating: <b>{point.value}</b>'
      },
      series: this.m_series //as SeriesOptionsType[]
  }
  this.m_chart = new Highcharts.Chart(option as Options);
  }
    
}
