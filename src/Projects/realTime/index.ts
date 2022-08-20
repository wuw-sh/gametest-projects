import {world} from 'mojang-minecraft';

function format(value: string | number) {
    return value < 10 ? '0' + value : value.toString();
}

function Year(year: number, hour: number) {
    hour = Hour(hour);
    if (hour >= 7 && hour <= 24) {
        return year;
    } else {
        return year + 1;
    }
}

function Month(month: number, hour: number) {
    hour = Hour(hour);
    if (hour >= 7 && hour <= 24) {
        return month;
    } else {
        return month + 1;
    }
}

function Day(date: number, hour: number) {
    hour = Hour(hour);
    if (hour >= 7 && hour <= 24) {
        return date;
    } else {
        return date + 1;
    }
}

function Hour(hour: number) {
    hour = hour + 7;
    return hour > 23 ? hour - 24 : hour;
}

const MonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
world.events.tick.subscribe(() => {
    const Time = new Date();
    const year = Year(Time.getFullYear(), Time.getHours());
    const month = MonthNames[Month(Time.getMonth(), Time.getHours())];
    const days = format(Day(Time.getDate(), Time.getHours()));
    const hours = format(Hour(Time.getHours()));
    const minutes = format(Time.getMinutes());
    const seconds = format(Time.getSeconds());
    const time = `${days}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
    Array.from(world.getPlayers()).map(pl => {
        pl.runCommand('title @s actionbar ' + time);
    });
});