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

exports.basicModel = (linesOfCode, projectType) => {
  linesOfCode = Number(linesOfCode)
  const constants = CONSTANTS[projectType]
  const effort = calculateEffort(linesOfCode, constants)
  const development = calculateDevelopment(effort, constants)
  const staffSize = calculateAverageStaffSize(effort, development)
  const productivity = calculateProductivity(linesOfCode, effort)
  return [effort, development, staffSize, productivity]
}
