const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

const port = process.env.PORT || 3000;
var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
return text.toUpperCase();
});

// Middleware
// -----------------------------------------------------------------------------


app.use((req,res,next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('Log.txt',log+'\n',(err)=>{
        if(err)
        {
            console.log('Uhnable to write to console log file');
        }

    });
    next();
});

app.use((req,res,next)=>{
res.render('maintenance.hbs',{
    pageBody : 'Maintenance page rendered'
})
});

app.use(express.static(__dirname+'/public'));
// -----------------------------------------------------------------------------



app.get('/',(req,res)=>{
    //res.send('Helo Express');
    //res.send('<b>Hello Express !</b>');
    // res.send({
    //     name :'Andrew',
    //     intrests: ['A','B','C','D']
    // });
    res.render('home.hbs',{
        welcomeMessage: 'Welcome Page',
        pageBody : 'Rendered Home page body',
        currentYear :  new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    //res.send('About Page');
    res.render('about.hbs',{
        pageBody : 'Rendered About page title',
        currentYear :  new Date().getFullYear()
    });    
});


app.get('/bad',(req,res)=>{
    res.send({
        errorCode : 404,
        errorMessage : 'Page not found' 
    });
});


app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        
    });
});
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});