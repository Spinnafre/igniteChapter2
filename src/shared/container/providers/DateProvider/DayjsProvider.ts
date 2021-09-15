import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { IDateProvider } from './Protocols/IDateProvider';

dayjs.extend(utc);
export class DateProvider implements IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number {
        const startDate=this.ConvertToUTC(start_date);
        const endDate=this.ConvertToUTC(end_date);
        return dayjs(endDate).diff(startDate, "hours")
    }
    DateNow(): Date {
        return dayjs().toDate()
    }
    ConvertToUTC(date: Date): string {
        return dayjs(date).utc().local().format()
    }
    compareInDays(startDate: Date, endDate: Date): number {
        const start=this.ConvertToUTC(startDate);
        const end=this.ConvertToUTC(endDate);
        return dayjs(end).diff(start,'days')
    }

}