// renders html code that can interpolate with js code
exports.output = (calculations) => {
  const selectedProjectType = calculations['selectedProjectType']
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocomo - Model</title>
  </head>
  <body>
    <h1>Output</h1>
    <h2>Min</h2>
    <ul>
      <li>Effort ${calculations[selectedProjectType][0]['effort']}</li>
      <li>Development ${calculations[selectedProjectType][0]['development']}</li>
      <li>Staff size ${calculations[selectedProjectType][0]['staffSize']}</li>
      <li>Productivity ${calculations[selectedProjectType][0]['productivity']}</li>
    </ul>
    <h2>Max</h2>
    <ul>
      <li>Effort ${calculations[selectedProjectType][calculations[selectedProjectType].length - 1]['effort']}</li>
      <li>Development ${calculations[selectedProjectType][calculations[selectedProjectType].length - 1]['development']}</li>
      <li>Staff size ${calculations[selectedProjectType][calculations[selectedProjectType].length - 1]['staffSize']}</li>
      <li>Productivity ${calculations[selectedProjectType][calculations[selectedProjectType].length - 1]['productivity']}</li>
    </ul>
    <div class="container">
    <canvas id="chart-effort-loc"></canvas>
    <canvas id="chart-development-loc"></canvas>
    <canvas id="chart-staffSize-loc"></canvas>
    <canvas id="chart-productivity-loc"></canvas>
  </div>
  <script>
    let effortCanvas = document.getElementById('chart-effort-loc').getContext('2d')
    let effortChart = new Chart(effortCanvas, {
      type: 'line',
      data: {
        labels: [${getLabels(calculations)}],
        datasets: [{
          label: 'Embedded', 
          data: [${getData(calculations, 'embedded', 'effort')}],
          fill: false,
          borderColor: 'blue'
          },
          {
            label: 'Semi-detached',
            data: [${getData(calculations, 'semi-detached', 'effort')}],
            fill: false,
            borderColor: 'red'
          },
          {
            label: 'Organic',
            data: [${getData(calculations, 'organic', 'effort')}],
            fill: false,
            borderColor: 'green'
          }
      ]
      },
      options: {
        title: {
          display: true,
          text: 'Effort vs Lines of Code',
          fontSize: 30
        },
        scales: {
          xAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Lines of Code (in thousands)'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'effort'
            }
          }]
        }
      }
    });


    let effortDevelopment = document.getElementById('chart-development-loc').getContext('2d')
    let developmentChart = new Chart(effortDevelopment, {
      type: 'line',
      data: {
        labels: [${getLabels(calculations)}],
        datasets: [{
          label: 'Embedded', 
          data: [${getData(calculations, 'embedded', 'development')}],
          fill: false,
          borderColor: 'blue'
          },
          {
            label: 'Semi-detached',
            data: [${getData(calculations, 'semi-detached', 'development')}],
            fill: false,
            borderColor: 'red'
          },
          {
            label: 'Organic',
            data: [${getData(calculations, 'organic', 'development')}],
            fill: false,
            borderColor: 'green'
          }
      ]
      },
      options: {
        title: {
          display: true,
          text: 'Development vs Lines of Code',
          fontSize: 30
        },
        scales: {
          xAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Lines of Code (in thousands)'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Development'
            }
          }]
        }
      }
    });


    let staffSizeCanvas = document.getElementById('chart-staffSize-loc').getContext('2d')
    let staffSizeChart = new Chart(staffSizeCanvas, {
      type: 'line',
      data: {
        labels: [${getLabels(calculations)}],
        datasets: [{
          label: 'Embedded', 
          data: [${getData(calculations, 'embedded', 'staffSize')}],
          fill: false,
          borderColor: 'blue'
          },
          {
            label: 'Semi-detached',
            data: [${getData(calculations, 'semi-detached', 'staffSize')}],
            fill: false,
            borderColor: 'red'
          },
          {
            label: 'Organic',
            data: [${getData(calculations, 'organic', 'staffSize')}],
            fill: false,
            borderColor: 'green'
          }
      ]
      },
      options: {
        title: {
          display: true,
          text: 'Staff Size vs Lines of Code',
          fontSize: 30
        },
        scales: {
          xAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Lines of Code (in thousands)'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Staff Size'
            }
          }]
        }
      }
    });


    let productivityCanvas = document.getElementById('chart-productivity-loc').getContext('2d')
    let productivityChart = new Chart(productivityCanvas, {
      type: 'line',
      data: {
        labels: [${getLabels(calculations)}],
        datasets: [{
          label: 'Embedded', 
          data: [${getData(calculations, 'embedded', 'productivity')}],
          fill: false,
          borderColor: 'blue'
          },
          {
            label: 'Semi-detached',
            data: [${getData(calculations, 'semi-detached', 'productivity')}],
            fill: false,
            borderColor: 'red'
          },
          {
            label: 'Organic',
            data: [${getData(calculations, 'organic', 'productivity')}],
            fill: false,
            borderColor: 'green'
          }
      ]
      },
      options: {
        title: {
          display: true,
          text: 'Productivity vs Lines of Code',
          fontSize: 30
        },
        scales: {
          xAxes: [{
            scaleLabel: {
            display: true,
            labelString: 'Lines of Code (in thousands)'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Productivity'
            }
          }]
        }
      }
    });
  </script>
  </body>
  </html>  
  `;
}

function getLabels(calculations) {
  return calculations['loc-labels']
}

function getData(calculations, projectType, metric) {
  return calculations[projectType].map(dataSet => dataSet[metric])
}
