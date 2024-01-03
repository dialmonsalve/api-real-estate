export const formatDate = (date: string) => {
	const newDate = new Date(date).toISOString().slice(0, 10);

	return new Date(newDate).toLocaleDateString("es-Es", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};
