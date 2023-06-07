const orderStatus = [
  "Przyjęto w oddziale",
  "W trakcie realizacji",
  "W trakcie pakowania",
  "Wysłane",
  "Czeka na odbiór",
];

function getRandom(arr: string[], n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export const randomOrderStatus = getRandom(orderStatus, orderStatus.length).map(
  (status) => status
);
