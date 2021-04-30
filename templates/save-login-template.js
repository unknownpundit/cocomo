exports.login = (calculations) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>COCOMO: Project Type</title>
    <meta name="viewport" content="width=device-width">
	<link href="styles.css" rel="stylesheet" type="text/css">
	<style>
		label {
  position: relative;
}

label > .icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: silver;
}

label > input {
  padding-left: calc(1em + 10px + 8px); /* icon width + icon padding-left + desired separation*/
  height: 2em;
}

/*
  SVG SpriteSheet
*/

.spritesheet {
  display: none;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
		</style> 
	  
	  
</head>
<body>
	<header id="Top">
		<div class="container-fluid bg-light mt-0 p-0">
			<div class="card bg-dark text-white">
					<img src="./home/imag/top.png" class="card-img " alt="..." width="1000" height="500" >
					<div class="card-img-overlay">
					<div class="row">
					<div class="col">
					  <div class="row">
						<div class="col" >
							<p class="card-text text-start"><img src="./home/imag/logo.png" alt="..." width="50" height="50"></p>
						</div>
						<div class="col">
						  <ul class="nav justify-content-end">
							<li class="nav-item">
							  <a class="nav-link active" aria-current="page" href="#">About</a>
							</li>
							<li class="nav-item">
							  <a class="nav-link" href="/model">Get Started</a>
							</li>
							<li class="nav-item">
							  <a class="nav-link" href="#">Account</a>
							</li>
			
						  </ul>
						</div>
					  </div>
					  <div class="row">
						  <br>
						  <br>
						  <br>

					  </div>
					  <div class="row">
						  <div class="col">   </div>
					  <div class="col bg-light text-dark">
						<h3 class="header">Member Login <img src='data:./home/image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMTYgMTUuNTAzQTUuMDQxIDUuMDQxIDAgMSAwIDE2IDUuNDJhNS4wNDEgNS4wNDEgMCAwIDAgMCAxMC4wODN6bTAgMi4yMTVjLTYuNzAzIDAtMTEgMy42OTktMTEgNS41djMuMzYzaDIydi0zLjM2M2MwLTIuMTc4LTQuMDY4LTUuNS0xMS01LjV6Ii8+PC9zdmc+'/> </h3>
						<form action="/save-model">
                            <div class="mb">
                              <label for="exampleInputEmail1" class="form-label">Email address</label><br>
                              
							  <label clas="name-label form-control">
								<svg class="icon icon-envelop">
								  <use xlink:href="#icon-envelop"></use>
								</svg>
								<input type="text" placeholder="Email" name="email">
							  </label>
                              <div id="emailHelp" class="form-text"></div>
                            </div>
                            <div class="mb">
                              <label for="exampleInputPassword1" class="form-label">Password</label><br>
                              <label clas="name-label form-control">
								<svg class="icon icon-user">
								  <use xlink:href="#icon-user"></use>
								</svg>
								<input type="text" placeholder="Password">
							  </label> 
                            </div>
                            <input type="hidden" name="calculations" value=${calculations}>
                            <button type="submit" class="btn btn-dark btn-lg">LOGIN</button>
                            <br>
                            <br>
                          </form>
							<a href="signup.html">Create your Account <img src='data:./home/image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNNS45NzUgMTcuNTA0bDE0LjI4Ny4wMDEtNi4zNjcgNi4zNjZMMTYuMDIxIDI2bDEwLjAwNC0xMC4wMDNMMTYuMDI5IDZsLTIuMTI4IDIuMTI5IDYuMzY3IDYuMzY2SDUuOTc3eiIvPjwvc3ZnPg=='/></a>
						  
						  
						  
						  <svg class="spritesheet">
							<symbol id="icon-user" viewBox="0 0 32 32">
							  <title>user</title>
							  <path d="M18.5 14h-0.5v-6c0-3.308-2.692-6-6-6h-4c-3.308 0-6 2.692-6 6v6h-0.5c-0.825 0-1.5 0.675-1.5 1.5v15c0 0.825 0.675 1.5 1.5 1.5h17c0.825 0 1.5-0.675 1.5-1.5v-15c0-0.825-0.675-1.5-1.5-1.5zM6 8c0-1.103 0.897-2 2-2h4c1.103 0 2 0.897 2 2v6h-8v-6z"></path>
							</symbol>
							<symbol id="icon-envelop" viewBox="0 0 32 32">
							  <title>envelop</title>
							  <path d="M29 4h-26c-1.65 0-3 1.35-3 3v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-20c0-1.65-1.35-3-3-3zM12.461 17.199l-8.461 6.59v-15.676l8.461 9.086zM5.512 8h20.976l-10.488 7.875-10.488-7.875zM12.79 17.553l3.21 3.447 3.21-3.447 6.58 8.447h-19.579l6.58-8.447zM19.539 17.199l8.461-9.086v15.676l-8.461-6.59z"></path>
							</symbol>
						  </svg>
						  
						  

							</div>
                            <div class="col"></div>
						</div>
							
					</div> 
					</div>
					</div>   
				</div>
			</div>
		</div>
	</header>

    <script src="./forms.js"></script>
</body>
</html>
`

function convertCalculationsToString(calculations) {
  result = JSON.stringify(calculations)
  return result
}
