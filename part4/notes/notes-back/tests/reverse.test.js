const { test, describe } = require("node:test")
const assert = require("node:assert")

const { reverse } = require("../utils/some_fun")

describe("reverse tests", () => {
  test("Reverse of empty string", () => {
    assert.strictEqual(reverse(""), "")
  })

  test("Reverse of a", () => {
    assert.strictEqual(reverse("a"), "a")
  })

  test("Reverse of react", () => {
    assert.strictEqual(reverse("react"), "tcaer")
  })

  test("Reverse of saippuakauppias", () => {
    assert.strictEqual(reverse("saippuakauppias"), "saippuakauppias")
  })
})