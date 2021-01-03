const math = {}

math.getRandomNumber = (min, max) => {
  min = typeof min == 'number' && min % 1 === 0 ? min : 0
  max = typeof max == 'number' && max % 1 === 0 ? max : 0
}

module.exports = math
