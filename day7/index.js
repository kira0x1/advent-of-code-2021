const input = require("./helper");

const fuelUsage = new Map();

const largest = input.sort((a, b) => b - a)[0];
const smallest = input.sort((a, b) => a - b)[0];

for (let i = smallest; i < largest; i++) {
  let fuel = 0;
  for (const n of input) {
    let nextFuelCost = 1;
    const f = Math.abs(n - i);
    for (let i = 0; i < f; i++) {
      fuel = fuel + nextFuelCost;
      nextFuelCost++;
    }
  }

  fuelUsage.set(i, fuel);
}

let cheapest = { h: input[0], fuel: fuelUsage.get(input[0]) };

for (const { 0: h, 1: v } of fuelUsage) {
  if (v < cheapest.fuel) cheapest = { h, fuel: v };
}

console.log(cheapest);
