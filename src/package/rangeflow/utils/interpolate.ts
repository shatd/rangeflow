type Range = [number, number]

export function interpolate(inputRange: Range, outputRange: Range) {
  return (value: number) => {
    const [inMin, inMax] = inputRange
    const [outMin, outMax] = outputRange

    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
  }
}
