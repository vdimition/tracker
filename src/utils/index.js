export const filterOption = (option, inputValue) => (
  option.label.toString().toLowerCase().match(inputValue.toLowerCase()) || []
).length > 0;