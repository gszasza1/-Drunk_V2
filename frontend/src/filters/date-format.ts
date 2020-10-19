import moment from 'moment';

export const dateformat = (value: Date | null, format?: string) => {
    if (!value) return '';
    value = new Date(value);
    if (!(value instanceof Date)) return 'Invalid date';

    return moment(value).format(format ?? 'YYYY. MM. DD.');
};
