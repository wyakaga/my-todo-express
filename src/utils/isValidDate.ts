const isValidDate = (dateStr: string): boolean => {
	const regex = /^\d{4}-\d{2}-\d{2}$/;

	if (dateStr.match(regex) === null) return false;

	const date = new Date(dateStr);
	const timeStamp = date.getTime();

	if (typeof timeStamp !== "number" || Number.isNaN(timeStamp)) return false;

	return date.toISOString().startsWith(dateStr);
};

export default isValidDate;
