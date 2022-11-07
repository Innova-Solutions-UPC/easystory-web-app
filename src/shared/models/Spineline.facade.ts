import Highcharts, {
  Chart,
  Options,
  SeriesOptionsType,
  SeriesSplineOptions,
  XAxisOptions,
} from "highcharts";
// Load the exporting module.
import Exporting from "highcharts/modules/exporting";
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
        backgroundColor: "transparent",
        type: "spline",
        style: {
          fontFamily: "PT Serif",
        },
        borderRadius: 20,
        animation: {
          duration: 118000,
        },
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: "%e. %b",
          year: "%b",
        },
        title: {
          text: "Date",
          margin: 40,
        },
      },

      yAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: "Grados",
          margin: 40,
        },
        labels: {
          format: "{value} °",
        },
        accessibility: {
          rangeDescription: "Range: 0 to 80 °.",
        },
        maxPadding: 0.05,
        showLastLabel: true,
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true,
          },
        },
      },

      colors: ["#6CF", "#fcc572", "#06C", "#036", "#000"],

      // Define the data points. All series have a dummy year
      // of 1970/71 in order to be compared on the same x axis. Note
      // that in JavaScript, months start at 0 for January, 1 for February etc.
      series: this.m_series,
      exporting: {
        enabled: false,
      },
    };
    const optionForMobile = {
      chart: {
        renderTo: this.m_containerId,
        backgroundColor: "transparent",
        type: "spline",
        style: {
          fontFamily: "PT Serif",
        },
        with: '400px',
        borderRadius: 20,
        animation: {
          duration: 118000,
        },
      },
      title: {
        text: "",
      },
      credits: {
        enabled: false,
      },

      yAxis: {
        labels: {
            align: 'left',
            x: 0,
            y: -2
        },
        title: {
            text: ''
        }
       
      },
      xAxis: {
        
        title: {
            enabled: true,
            text:''
        },
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true,
          },
        },
      },

      colors: ["#6CF", "#fcc572", "#06C", "#036", "#000"],

      // Define the data points. All series have a dummy year
      // of 1970/71 in order to be compared on the same x axis. Note
      // that in JavaScript, months start at 0 for January, 1 for February etc.
      series: this.m_series,
      exporting: {
        enabled: false,
      },
    };

    if (this.screenWidth > 600) {
      this.m_chart = new Highcharts.Chart(option as Options);
    }
    else {
        this.m_chart = new Highcharts.Chart(optionForMobile as Options);
    }
  }
}
