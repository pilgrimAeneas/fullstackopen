const reverse = string => {
  return string
    .split("")
    .reverse()
    .join("")
}

const average = array => {
  const sum = array.reduce((acc, item) => item + acc, 0)
  return (array.length === 0 ? 0 : sum / array.length)
}

module.exports = { reverse, average }