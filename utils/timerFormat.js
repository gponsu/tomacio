const formats = {
  "hh:mm:ss": [11, 8],
  "hh:mm": [11, 5],
  "mm:ss": [14, 5]
}

function timerFormat(milliseconds, format = "mm:ss") {
  let time = milliseconds || 0;

  if (!Object.keys(formats).includes(format)) format = "mm:ss";

  return new Date(time).toISOString().substr(...formats[format]);
}

export default timerFormat;
