export const highlightSearchText = (
  searchTerm: string,
  searchValue: string,
  searchTermClassName = 'as-m-search-result-item__search-value'
): string => {
  const searchValueRegEx = new RegExp(
    searchValue.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'),
    'gi'
  );
  return searchTerm.replace(
    searchValueRegEx,
    `<span class="${searchTermClassName}">$&</span>`
  );
};

export const concatSearchItemsSubtitles = (subtitle?: string[]): string => {
  return !!subtitle && subtitle.length > 0
    ? subtitle.slice(0, 2).join(', ')
    : undefined;
};
