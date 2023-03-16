type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export const mixColors = (color1: string, color2: string): string => {
  const rgbToObj = (rgbString: string): RGBColor => {
    const rgbValues = rgbString
      .substring(rgbString.indexOf("(") + 1, rgbString.lastIndexOf(")"))
      .split(",")
      .map((value) => parseInt(value.trim(), 10));

    return { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
  };

  const objToRgb = (color: RGBColor): string => {
    const { r, g, b } = color;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const { r: r1, g: g1, b: b1 } = rgbToObj(color1);
  const { r: r2, g: g2, b: b2 } = rgbToObj(color2);

  const r = Math.round((r1 + r2) / 2);
  const g = Math.round((g1 + g2) / 2);
  const b = Math.round((b1 + b2) / 2);

  return objToRgb({ r, g, b });
};
