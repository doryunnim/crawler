var {PythonShell} = require('python-shell');

var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: ['value1', 'value2', 'value3']
  };
  
module.exports = function crawling(){
    var brand_list = ["subway", "papajohns", "burgerking", "vips"]

    for (var i in brand_list){
        var str = "../crawler/complete_crawler/brand_name_crawler.py"
        var path = str.replace('brand_name', brand_list[i]);
        PythonShell.run(path, options, function(err, results){
            if(err) throw err;
        
        console.log('results: %j', results);
        });
    }
}