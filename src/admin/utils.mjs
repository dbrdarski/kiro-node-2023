export const inputValue = (value) => value ?? ""
export const selectOptions = (value, options) => options.map(option => ({
  ...option.value === value && { selected: true },
  ...option
}))

export const multiSelectOptions = (value, options) => options.map(option => ({
  ...value?.includes(option.value) && { checked: true },
  ...option
}))
