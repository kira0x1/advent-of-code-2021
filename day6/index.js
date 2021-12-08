const input = require("./helper");

const days = 256;

let numbers = input;

let fishes = 0;

const memoizedTotalFish = memoize(getTotalFishes);

for (const n of numbers) {
  let f1 = n;
  for (let i = 1; i < days + 1; i++) {
    if (f1 === 0) {
      const res = memoizedTotalFish(i + 2, 7);
      fishes++;
      fishes += res;
      f1 = 6;
    } else {
      f1--;
    }
  }
}

console.log(fishes + numbers.length);

function memoize(f) {
  const cacheLookup = {}; // Value cache stored in the closure
  return function () {
    const key = Array.prototype.join.call(arguments, "-");
    if (key in cacheLookup) {
      return cacheLookup[key];
    } else {
      return (cacheLookup[key] = f.apply(this, arguments));
    }
  };
}

function getTotalFishes(daysLeft, fish) {
  let total = 0;
  for (let i = daysLeft; i < days + 1; i++) {
    if (fish === 0) {
      total++;
      fish = 6;
      total += getTotalFishes(i, 9);
    } else {
      fish--;
    }
  }

  return total;
}
