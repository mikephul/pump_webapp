# Water Distribution Network
1.  Clone the project from GitHub
```
git clone https://github.com/mikephul/pump_webapp.git
```
2. Change into project directory
```
cd pump_webapp
```
3. Install the requirement
```
 pip install -r requirements.txt 
```
4. Install [mosek license file](https://www.mosek.com/resources/academic-license)
5. Make sure that the project folder contains the .inp file that describe the water distribution network. (We include the Small.inp and Big.inp in the project.) Run flask application with the script below. This will run the application in the debug mode. You can turn off the debug mode in the file. 
```
bash run_flask
```
6. The default port is 5000. You can see the application at
```
http://localhost:5000/
```

# File overview
1. app.py - Manage database and output to the interface
2. io_handler.py - Handle input and output such as read the .inp file and save some variables
3. solve_handler.py - Solve the predirection, imaginary, iterative steps via Mosek
4. static/index.html - Main web interface 