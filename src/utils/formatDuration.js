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


export function formatTimeLeft(start, now) {
    const endTime = dayjs(start).add(60, 'minutes'); // Assuming exam duration is 120 minutes
    const durationMs = endTime.diff(now);
    const duration = dayjs.duration(durationMs);

    return [
        `${duration.minutes()}`.padStart(2, "0"),
        `${duration.seconds()}`.padStart(2, "0"),
    ].filter(Boolean).join(':');
}