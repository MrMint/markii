export function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(`0x${p1}`)
  ));
}
