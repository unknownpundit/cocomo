exports.output = (user) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <link rel="shortcut icon" type="image/jpg" href="../home/imag/logo.svg"/>
  <title>Cocomo</title>
  <style>
    body {
      background-image: url("../home/imag/background.png");
      background-position: 0 85px;
      background-repeat: repeat-x;
    }

    #intro {
      margin-top: 1%;
      padding: 7% 0;
      background-image: url("../home/imag/pattern.png");
    }
  </style>
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
          href="./signout">Sign Out: ${user['name']}</a>
      </li>
    </ul>
  </div>
</nav>

<section id="intro">
  <h1 class="card-title text-center text-uppercase">Cocomo</h1>
    <p class="card-text text-center" >Cocomo is a cost constructive model made to <br>
                          reliably predict the various parameters<br>
                          associated with making software such as size,<br>
                          effort cost, time, and quality.</p>
    <p class="text-center"><a href="/model" class="btn btn-dark btn-lg align-items-center">Get Started</a></p>
</section>

<section id="project costs">
  <div class="container-fluid mt-0 p-0 ms-0 px-0" style="background-color: rgb(36, 34, 32)">
   
      <div class="row align-items-center ">
        <div class="col-md-6">
      
          <img src="home/imag/key.png" class="w-100 h-75">
        
          </div>
          
        <div class="col-md-6 align-items-center text-white">
          <p class="card-text">
          <h3 class="text-capitalize text-center ">Discover key project costs </h3>
          <p class="card-text text-center px-5 fs-4 lh-lg fw-normal">Cost in Project Management is two types: Direct costs include fixed labor, materials, and equipment. They are typically one-off costs that come from a single department or the project itself. Indirect costs include utilities and quality control. Cocomo is a procedural cost estimate model for software projects.</p>
        </p>
        
        </div>
       </div> 
      
  </div>
      
</section>

<section id="Customizable parameters">
  <div class="container-fluid mt-0 p-0 ms-0 px-0" style="background-color: rgb(255, 131, 86)">
    <div class="row text-white align-items-center">
      
        <div class="col-md-6 align-items-center">
          <img src="home/imag/customiz.png" class="w-100 h-75">
          </div>
      
        <div class="col-md-6 text-white text-center align-items-center">
          <p class="text-center">
          
          <h3 class="text-capitalize text-center ">Customizable parameters for unique projects </h3>
          <p class=" text-center px-5 fs-4 lh-lg fw-normal">The COCOMO estimates the cost for software product development in terms of resources required to complete the project and time needed to complete the project based on the size of the software product. It estimates the required number of Man-Months (MM) for the full development of software products</p>
          </p>
        </div>
        
      
  
</div>
</div>
</div>
      
</section>
<section id="Easy to use">
  <div class="container-fluid bg-white mt-0 p-0 ms-0 px-0">
    
         
      <div class="row align-items-center">
          <div class="col-md-6 "><img src="home/imag/easy.png" class="w-100 h-75 ">
          
      </div>
      <div class="col-md-6 text-dark"><h3 class="text-capitalize text-center">Easy to use, no matter the experience</h3>
        <p class="text-center">No matter how much experience you have, you can use this constructive cost model made. We have two model types of Basic and Intermediate with three different types of the project: Organic, Semi-Detached, and Embedded. </p>

          
      </div>
      
      

  </div>
</section>

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
</body>
</html>
`;
}
