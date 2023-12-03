const app = require('./app');
const db = require('./src/database/db');

app.listen(process.env.PORT,function(){

    console.log("App Running at port: "+process.env.PORT);

})

