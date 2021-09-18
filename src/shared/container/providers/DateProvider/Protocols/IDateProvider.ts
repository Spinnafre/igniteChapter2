export interface IDateProvider{
    compareInHours(start_date:Date, end_date:Date):number,
    DateNow():Date;
    ConvertToUTC(date:Date):string;
    compareInDays(startDate: Date, endDate: Date): number,
    addDays(day:number):Date
}