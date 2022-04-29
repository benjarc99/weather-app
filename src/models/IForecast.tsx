export interface IForecast {
    detailedForecast: string;
    endTime: Date;
    icon: string
    isDaytime: boolean
    name: string
    number: number
    shortForecast: string
    startTime: Date
    temperature: number
    temperatureTrend: null
    temperatureUnit: string
    windDirection: string
    windSpeed: string
}