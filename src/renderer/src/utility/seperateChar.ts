export const seperateChar = (str: string, char: string) => {
    const value = str.split(char)[0]
    const upperValue = value.toUpperCase()
  return upperValue
}