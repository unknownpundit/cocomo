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
  return { 'locMin': locMin, 'locMax': locMax, 'projectType': projectType, 'modelType': modelType }
}

// basicModel returns an object of outputs by each projectType and 11 individual LOC calculations per each projectType
exports.basicModel = (raw_query) => {
  const query = parseQuery(raw_query)
  const locMin = query['locMin']
  const locMax = query['locMax']
  const range = locRange(locMin, locMax)
  const outputSet = { } // nested is the outputs by projectType, as well as selected projectType
  outputSet['selectedProjectType'] = query['projectType']
  outputSet['loc-labels'] = range
  const projectTypes = ['organic', 'semi-detached', 'embedded']
  projectTypes.forEach(projectType => calculateProjectType(projectType, outputSet, range))
  return outputSet
}

// calculates all the set of metrics for a specific project type
function calculateProjectType(projectType, outputSet, range) {
  const constants = CONSTANTS[projectType]
  const projectTypeOutputSet = []
  range.forEach(loc => calculateMetrics(loc, constants, projectTypeOutputSet));
  outputSet[projectType] = projectTypeOutputSet
}

// calculates metrics for a single LOC input
function calculateMetrics(loc, constants, projectTypeOutputSet) {
  const effort = calculateEffort(loc, constants)
  const development = calculateDevelopment(effort, constants)
  const staffSize = calculateAverageStaffSize(effort, development)
  const productivity = calculateProductivity(loc, effort)
  projectTypeOutputSet.push({ 'effort': effort, 'development': development, 'staffSize': staffSize, 'productivity': productivity, 'loc': loc })
}

// returns a range of loc between min and max for charts
function locRange(min, max) {
  let buffer = Math.ceil(max / 10) 
  const values = [min]
  for (let i = 1; i < 11; i++) {
    values[i] = values[i - 1] + buffer
  }
  return values
}
