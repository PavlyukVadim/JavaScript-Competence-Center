/// <binding ProjectOpened='Watch - Development' /> 

"use strict"; 

module.exports = {
    entry: {
        "scripts/js/slider": "./scripts/jsx/slider.jsx",
        "scripts/js/services": "./scripts/jsx/services.jsx",
        "scripts/js/form": "./scripts/jsx/form.jsx",
        "scripts/js/portfolio": "./scripts/jsx/portfolio.jsx",
        "scripts/js/stata": "./scripts/jsx/stata.jsx"
    } ,
           
    output: {
        filename: '[name].js'
    }, 

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader", 
				exclude: /node_modules/, 
				query: {
					
					presets: ["es2015","react"], 
					plugins: ["transform-object-rest-spread"]

				}
            }
        ]
    }
};