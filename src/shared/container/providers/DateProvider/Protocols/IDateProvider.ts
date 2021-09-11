export interface IDateProvider{
    compareInHours(start_date:Date, end_date:Date):number,
    DateNow():Date;
    ConvertToUTC(date:Date):string
}