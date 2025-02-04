export default function stringifyDate(date: Date | string | null) {
    /**
     * Stringifies dates if necessary.
     */
    let dateString;

    if (typeof date == "object") {
        dateString = date?.toISOString().slice(0, 10)
    } else if (typeof date == "string") {
        dateString = (date as string).slice(0, 10);
    } else {
        dateString = "";
    }

    return dateString as string;
}