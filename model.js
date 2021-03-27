// basic model constants
const CONSTANTS = {
  'organic': { 'a': 2.4, 'b': 1.05, 'c': 2.5, 'd': 0.38 },
  'semi-detached': { 'a': 3,'b': 1.12,'c': 2.5,'d': 0.35 },
  'embedded': { 'a': 3.6,'b': 1.2,'c': 2.5,'d': 0.32 }
}

function calculateEffort(linesOfCode, constants) {
  return constants['a'] * (linesOfCode) ** constants['b']
}

function calculateDevelopment(effort, constants) {
  return constants['c'] * effort ** constants['d']
}

function calculateAverageStaffSize(effort, development) {
  return effort / development
}

function calculateProductivity(linesOfCode, effort) {
  return linesOfCode / effort
}

// takes the raw query and splits it up
function parseQuery(query) {
  locMin = Number(query['loc-min'])
  locMax = Number(query['loc-max'])
  projectType = query['project-type']
  modelType = query['model-type']
  return [locMin, locMax, projectType, modelType]
}

// basicModel returns an object of outputs for min and max
exports.basicModel = (raw_query) => {
  const query = parseQuery(raw_query)
  const locMin = query[0]
  const locMax = query[1]
  const projectType = query[2]
  const modelType = query[3]
  const constants = CONSTANTS[projectType]
  const effortMin = calculateEffort(locMin, constants)
  const developmentMin = calculateDevelopment(effortMin, constants)
  const staffSizeMin = calculateAverageStaffSize(effortMin, developmentMin)
  const productivityMin = calculateProductivity(locMin, effortMin)
  const effortMax = calculateEffort(locMax, constants)
  const developmentMax = calculateDevelopment(effortMax, constants)
  const staffSizeMax = calculateAverageStaffSize(effortMax, developmentMax)
  const productivityMax = calculateProductivity(locMin, effortMax)

  return { 'min': [effortMin, developmentMin, staffSizeMin, productivityMin], 'max': [effortMax, developmentMax, staffSizeMax, productivityMax] }
}
