# Constructive Cost Model

## Overview

## Features

## Development
Run ```sudo node server.js``` to start the app.

### Routes
* Root path '/' will yield -> public/home/index.html
* '/model' will yield 
  * -> public/model.model.html (when no queries)
  * -> template.js back to model (if model-type is basic)
  * -> templateI.js back to model (if model-type is intermediate)

#### Other files

Images or any other file type will go to the default statement in the ```router.js``` file. It expects any other file to already include ```'/public'```. So if you want to add a photo for example from the path ```'public/images/apple.png'``` all you need to reference is ```'/images/apple.png'```

## Team Members
* Laleh Sohrab
* Christopher Arbelo
* Daniel Herold 
