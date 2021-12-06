const animal = require("./animal.ts");

try {
  const { cat } = animal;
  console.log("=== animal", cat);
  cat.eat("fish");
} catch (e) {
  console.log("====read error", e);
}
