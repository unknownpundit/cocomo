exports.output = (models) => {
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
    <link rel="stylesheet" href="./output/output-style.css">
    <link rel="shortcut icon" type="image/jpg" href="../home/imag/logo.svg"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cocomo - Model</title>
  </head>
  <body>
  <nav class="navbar navbar-expand navbar-light" style="justify-content: space-between;">
    <a class="navbar-brand" href="./"><img src="../home/imag/logo.svg" alt="Logo" width="60" height="60"></a>
    <div>
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" aria-current="page"
            href="./">About</a>
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
  </nav>

  <div id="content-wrap">
    <section id="body">
    <ul>
    ${showModels(models)}
    </ul>
    </section>
  </div>

  <footer class="navbar navbar-expand navbar-dark bg-dark" style="justify-content: space-between; padding: 1%;">
    <div>
      <ul class="navbar-nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="./">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="./">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/model">Cocomo Model</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../home/account.html">Account</a>
        </li>
      </ul>
    </div>
    <a class="navbar-brand" href="./"><img src="../home/imag/logo.svg" alt="Logo" width="60" height="60"></a>
  </footer>
  `;
}


function showModels(models) {
  links = ''
  models.forEach(model => {
    links += `<li><a href="./output-saved?modelID=${model.reportID}">Model: ${model.reportID}</a></li>`
  });
  return links
}
