# plotly-challenge
## Tecnologico de Monterrey Data Analytics Boot Camp Plotly Assignment

In this assignment I was asked to build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.  The source of the data could be inquired in this link: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/.  

I was given an html starter code with the dashboard template, necessary header information, i.e. bootstrap stylesheet; body with the div necessary to show dataset information: table, bubble graph and gauge graph; and scripts for d3.js and plotly.  

On the app.js file I worked to develop d3.js & plotly code to read the samples.json file.  Since it is a json file, It is read from the python -m http. server or from github web pages.   That is reason why on the html file, I commented the given script to read the samples.json file.  

Please be advised that when working on the bonus.js file to develop the gauge chart, I had difficulty to generate correctly the app.js functions to generate table and chart.  It seems that calling the function OptionChanged in both "app.js" and "bonus.js" files, causes a conflict. So I included the function to generate the gauge chart in the app.js file and bonus.js file is no longer required in the html file.  

It was very interesting doing research for the gauge chart code, since it relates to making a pie chart.  I have referenced the source for this in the app.js file.

Here is a print screen of the web page using information from Test Subject ID. 974; individual with ZERO washing frequency number, and hughe amount of bacteria! 

![alt text][pic]

[pic]: https://github.com/plotly "screen"












