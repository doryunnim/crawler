var {PythonShell} = require('python-shell');
const schedule = require('node-schedule');

var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: ['value1', 'value2', 'value3']
  };
  
module.exports = function crawling(brand_name){
    var brand_list = ["subway", "papajohns", "burgerking", "vips"];

    // for (i=0; i<brand_list.length; i++){
            var str = "../crawler/complete_crawler/brand_name_crawler.py"
            // var path = str.replace('brand_name', brand_list[i]);
            var path = str.replace('brand_name', brand_name);
            PythonShell.run(path, options, function(err, results){
                if(err) throw err;
            
                console.log('results: %j', results);
            });
    // }
}
