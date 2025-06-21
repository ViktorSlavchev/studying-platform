import dayjs from "./dayjs";

export function formatDuration(start, end) {
    const durationMs = new Date(end) - new Date(start);
    const duration = dayjs.duration(durationMs);


    return [
        duration.hours() ? `${duration.hours()} ч` : null,
        duration.minutes() ? `${duration.minutes()} мин` : null,
        duration.seconds() ? `${duration.seconds()} сек` : null,
    ].filter(Boolean).join(' ');
}
