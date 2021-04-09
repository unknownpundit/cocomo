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
    <header id="Top">
    <div class="container-fluid bg-light mt-0 p-0">
      <div class="card bg-dark text-white">
        <img src="../home/imag/header.png" class="card-img " alt="..."
          width="1000" height="150">
        <div class="card-img-overlay">
          <div class="row">
            <div class="col">
              <div class="row">
                <div class="col-ms-6">
                  <p class="card-text text-start"><a href="/"><img
                        src="../home/imag/logo.png" alt="..." width="60"
                        height="60"></a></p>
                </div>
                <div class="col">
                  <ul class="nav justify-content-end">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page"
                        href="#">About</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/model">Get
                        Started</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link"
                        href="../home/account.html">Account</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <section id="body">
    <h1>Output</h1>
    <section>Selected Project type: ${formatProjectType(selectedProjectType)}</section>
    <h2>Min</h2>
    <ul>
      <li>Effort: ${getCalculation(calculations, selectedProjectType, true, 'effort')} Person months</li>
      <li>Development: ${getCalculation(calculations, selectedProjectType, true, 'development')} Months</li>
      <li>Staff size: ${getCalculation(calculations, selectedProjectType, true, 'staffSize')} People</li>
      <li>Productivity: ${getCalculation(calculations, selectedProjectType, true, 'productivity')} KLOC/Person months</li>
    </ul>
    <h2>Max</h2>
    <ul>
      <li>Effort: ${getCalculation(calculations, selectedProjectType, false, 'effort')} Person months</li>
      <li>Development: ${getCalculation(calculations, selectedProjectType, false, 'development')} Months</li>
      <li>Staff size: ${getCalculation(calculations, selectedProjectType, false, 'staffSize')} People</li>
      <li>Productivity: ${getCalculation(calculations, selectedProjectType, false, 'productivity')} KLOC/Person months</li>
    </ul>
    <div class="container">
      <canvas id="chart-effort-loc"></canvas>
      <canvas id="chart-development-loc"></canvas>
      <canvas id="chart-staffSize-loc"></canvas>
      <canvas id="chart-productivity-loc"></canvas>
    </div>
  </section>
  <footer id="footer">
		<div class="container-fluid">
			<div class="row bg-dark text-white">
				<div class="col-md-6">
					<ul class="nav flex-column">
						<br>
						<li class="nav-item">
							<a class="nav-link " aria-current="page" href="#">SiteMap</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">About</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="model.html">Cocomo Model</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="../home/account.html">Account</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Help</a>
						</li>
					</ul>
				</div>
				<div class="col-md-2">
				</div>
				<div class="col-md-4">
				</div>
			</div>
		</div>
	</footer>
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

function formatProjectType(projectType) {
  return projectType.slice(0,1).toUpperCase() + projectType.slice(1)
}

function getCalculation(calculations, projectType, min, metric) {
  const calculation = min ? calculations[projectType][0][metric] : calculations[projectType][calculations[projectType].length - 1][metric]
  if (calculation < 1) {
    return Math.round(calculation * 1000) / 1000
  }
  return Math.round(calculation)
}
