const express = require('express');
const app = express();
const _ = require('lodash');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const homeContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

const aboutContent = "Do you remember the famous tuk-tuk chase from the Roger Moore stared 1983’s James Bond classic Octopussy? Or the more recent Best Exotic Marigold Hotel where the Taj Lake Palace can be seen from the roof terrace of the hotel where the British holidaymakers would gather for a pint? If you do, then you must also remember Udaipur, the magnificently photogenic city built around a series of artificial lakes and known for its lavish royal residences, redolent of the Raj.";

const contactContent = "And those annual rituals of holiday making at my grandparent’s place in the historic old city of Kolkata, the last reminiscent of British Raj. Criss-crossing the country on a 1500 mile long Indian Railways for days through the Great Indian Hinterlands was a revelation on my young mind. Tea vendors jostling to attract eyeballs at crowded Allahabad station, or the Hindu monks in saffron robes praying to the early morning sun at the bank of The Ganges in Varanasi, would keep alluring the little girl in me to come out and experience the other world that awaited with open arms beyond the rugged terrain of Rajasthan";

const blogs=[];

app.get('/', (req, res)=>{
    res.render('home', {homeContent:homeContent, blogs:blogs});
    
});

app.get('/about', (req, res)=>{
    res.render('about', {aboutContent:aboutContent});
    
});

app.get('/contact', (req, res)=>{
    res.render('contact', {contactContent:contactContent});
    
});

app.get('/compose', (req, res)=>{
    res.render('compose');
    
});

app.get('/blogs/:blogId', (req, res)=>{

    console.log(req.params.blogId);
    console.log(blogs);

    blogs.forEach((e)=>{
        if (_.lowerCase(e.blogTitle)===_.lowerCase(req.params.blogId)){
            console.log('blog title:' + e.blogTitle + ' blog post:' + e.blogPost);
            res.render('post', {blogTitle:e.blogTitle, blogPost:e.blogPost});
        }
    });

});

app.post('/compose', (req, res)=>{

    var blog={
        blogTitle: req.body.blogTitle,
        blogPost: req.body.blogPost
    }
    blogs.push(blog);
    res.redirect('/');
});

try {
    app.listen(PORT, ()=>{
        console.log('Servecr started in running mode...');    
    });    
} catch (error) {
    console.log(error);
}



