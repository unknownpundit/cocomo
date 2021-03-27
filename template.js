// renders html code that can interpolate with js code
exports.output = (calculations) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocomo - Model</title>
  </head>
  <body>
    <h1>Output</h1>
    <ul>
      <li>Effort ${calculations['min'][0]}</li>
      <li>Development ${calculations['min'][1]}</li>
      <li>Staff size ${calculations['min'][2]}</li>
      <li>Productivity ${calculations['min'][3]}</li>
    </ul>
  </body>
  </html>  
  `;
}
