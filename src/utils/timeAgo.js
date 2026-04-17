export function timeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const diffMs = now - date;

    const minutes = diffMs / (1000 * 60);
    const hours = diffMs / (1000 * 60 * 60);
    const days = diffMs / (1000 * 60 * 60 * 24);
    const months = days / 30.44;
    const years = days / 365.25;

    if (years >= 1) {
        const val = Math.floor(years);
        return `${val} year${val !== 1 ? "s" : ""} ago`;
    }
    if (months >= 1) {
        const val = Math.floor(months);
        return `${val} month${val !== 1 ? "s" : ""} ago`;
    }
    if (days >= 1) {
        const val = Math.floor(days);
        return `${val} day${val !== 1 ? "s" : ""} ago`;
    }
    if (hours >= 1) {
        const val = Math.floor(hours);
        return `${val} month${val !== 1 ? "s" : ""} ago`;
    }

    const val = Math.floor(minutes);
    return `${val} minute${val !== 1 ? "s" : ""} ago`;
}