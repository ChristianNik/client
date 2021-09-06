export const mostConvenienceItems = (items, amount = 10) => {
	return items
		.sort((a, b) => b.valuationConvenience - a.valuationConvenience)
		.slice(0, amount);
};
