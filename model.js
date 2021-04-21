// basic model constants
const CONSTANTS = {
  'organic': { 'a': 2.4, 'b': 1.05, 'c': 2.5, 'd': 0.38 },
  'semi-detached': { 'a': 3,'b': 1.12,'c': 2.5,'d': 0.35 },
  'embedded': { 'a': 3.6,'b': 1.2,'c': 2.5,'d': 0.32 }
}

// Intermediate Model Constants
const CONSTANTSI = {
  'organic': {'a': 3.2, 'b': 1.05, 'c': 0.38},
  'semi-detached': {'a': 3.0, 'b': 1.12, 'c': 0.35},
  'embedded': {'a': 2.8, 'b': 1.20, 'c': 0.32},
  //Product Attributes
  'RSR': {'a': 0.75, 'b': 0.88, 'c': 1.00, 'd': 1.15, 'e': 1.40},
  'SAD': {'a': 0.94, 'b': 1.00, 'c': 1.08, 'd': 1.16},
  'CP': {'a': 0.70, 'b': 0.85, 'c': 1.00, 'd': 1.15, 'e': 1.30},
  //Hardware Attributes
  'RPC': {'a': 1.00, 'b': 1.11, 'c': 1.30},
  'MC': {'a': 1.00, 'b': 1.06, 'c': 1.21},
  'VVME': {'a': 0.87, 'b': 1.00, 'c': 1.15, 'd': 1.30},
  'RTT': {'a': 0.94, 'b': 1.00, 'c': 1.07, 'd': 1.15},
  //Personnel Attributes
  'AC': {'a': 1.46, 'b': 1.19, 'c': 1.00, 'd': 0.86, 'e': 0.71},
  'AE': {'a': 1.29, 'b': 1.13, 'c': 1.00, 'd': 0.91, 'e': 0.82},
  'SEC': {'a': 1.42, 'b': 1.17, 'c': 1.00, 'd': 0.86, 'e': 0.70},
  'VME': {'a': 1.21, 'b': 1.10, 'c': 1.00, 'd': 0.90},
  'PLE': {'a': 1.14, 'b': 1.07, 'c': 1.00, 'd': 0.95},
  //Project Attributes
  'ASEM': {'a': 1.24, 'b': 1.10, 'c': 1.00, 'd': 0.91, 'e': 0.82},
  'UST': {'a': 1.24, 'b': 1.10, 'c': 1.00, 'd': 0.91, 'e': 0.83},
  'RDS': {'a': 1.23, 'b': 1.08, 'c': 1.00, 'd': 1.04, 'e': 1.1}
}

//Intermediate Functionality

function calculateEAF(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11, value12, value13, value14, value15)
{
  return (CONSTANTSI['RSR'][value1]) * (CONSTANTSI['SAD'][value2]) * (CONSTANTSI['CP'][value3]) * (CONSTANTSI['RPC'][value4]) * (CONSTANTSI['MC'][value5]) 
  * (CONSTANTSI['VVME'][value6]) * (CONSTANTSI['RTT'][value7]) * (CONSTANTSI['AC'][value8]) * (CONSTANTSI['AE'][value9]) * (CONSTANTSI['SEC'][value10]) * (CONSTANTSI['VME'][value11])
  * (CONSTANTSI['PLE'][value12]) * (CONSTANTSI['ASEM'][value13]) * (CONSTANTSI['UST'][value14]) * (CONSTANTSI['RDS'][value15])
}

function calculateIMEffort(linesOfCode, CONSTANTSI, EAF) {
  return (CONSTANTSI['a'] * (linesOfCode) ** CONSTANTSI['b']) * EAF
}

function calculateIMDevelopment(effort, CONSTANTSI) {
  return (2.5 * effort) ** (CONSTANTSI['c'])
}

function calculateIMProductivity(effort, development) {
  return effort / development
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
  projectName = query['project-name']
  return { 'locMin': locMin, 'locMax': locMax, 'projectType': projectType, 'modelType': modelType, 'projectName': projectName }
}

//Intermediate Raw Query
function parseQueryI(query) {
  locMin = Number(query['loc-min'])
  locMax = Number(query['loc-max'])
  projectType = query['project-type']
  modelType = query['model-type']
  val1 = query['RSR']
  val2 = query['SAD']
  val3 = query['CP']
  val4 = query['RPC']
  val5 = query['MC']
  val6 = query['VVME']
  val7 = query['RTT']
  val8 = query['AC']
  val9 = query['AE']
  val10 = query['SEC']
  val11 = query['VME']
  val12 = query['PLE']
  val13 = query['ASEM']
  val14 = query['UST']
  val15 = query['RDS']
  projectName = query['project-name']
  return [locMin, locMax, projectType, modelType, val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11, val12, val13, val14, val15, projectName]
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
  outputSet['project-name'] = query['projectName']
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
  let buffer = Math.ceil((max - min) / 10) 
  const values = [min]
  for (let i = 1; i < 11; i++) {
    values[i] = values[i - 1] + buffer
  }
  return values
}

exports.intermediateModel = (raw_query) => {
  const query = parseQueryI(raw_query)
  const locMin = query[0]
  const locMax = query[1]
  const range = locRange(locMin, locMax)
  const outputSet = { } // nested is the outputs by projectType, as well as selected projectType
  outputSet['selectedProjectType'] = query[2]
  outputSet['loc-labels'] = range
  outputSet['project-name'] = query[query.length - 1]
  const projectTypes = ['organic', 'semi-detached', 'embedded']
  projectTypes.forEach(projectType => calculateProjectTypeIntermediate(projectType, outputSet, range, query))
  return outputSet
}

function calculateProjectTypeIntermediate(projectType, outputSet, range, query) {
  const constants = CONSTANTSI[projectType]
  const projectTypeOutputSet = []
  range.forEach(loc => projectTypeOutputSet.push(calculateMetricsIntermediate(loc, constants, query, projectTypeOutputSet)))
  outputSet[projectType] = projectTypeOutputSet
}

function calculateMetricsIntermediate(loc, constants, query) {
  const val1 = query[4]
  const val2 = query[5]
  const val3 = query[6]
  const val4 = query[7]
  const val5 = query[8]
  const val6 = query[9]
  const val7 = query[10]
  const val8 = query[11]
  const val9 = query[12]
  const val10 = query[13]
  const val11 = query[14]
  const val12 = query[15]
  const val13 = query[16]
  const val14 = query[17]
  const val15 = query[18]
  const EAF = calculateEAF(val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15)
  const effort = calculateIMEffort(loc, constants, EAF)
  const development= calculateIMDevelopment(effort, constants)
  const productivity = calculateIMProductivity(effort, development)
  const staffSize = calculateAverageStaffSize(effort, development)
  return { 'effort': effort, 'development': development, 'productivity': productivity, 'staffSize': staffSize, 'loc': loc }
}

// For Testing
exports.calculateEffort = calculateEffort
exports.calculateDevelopment = calculateDevelopment
exports.calculateAverageStaffSize = calculateAverageStaffSize
exports.calculateProductivity = calculateProductivity
exports.calculateMetricsIntermediate = calculateMetricsIntermediate
