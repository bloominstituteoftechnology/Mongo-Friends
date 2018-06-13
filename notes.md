###Mongoose
* wraps around native Mongo driver to make cleaner API

###Mongoose Schema
* how we define the shape of our data.

Is mongoose a good fit for data that is dynamic (little to no structure): Probably not a good fit. We bring in mongoose when we have a pretty good idea of what the data is going to look like. 

* if my database server address is:  'dbonline.com' and my database name is 'zoodb', build a connection string using the default port(27017)

```mongoose.connect('mongodb://dbonline.com/zoodb')```

* a MongoDB server can have many _databases_? 
 YES

* a JS object is stored inside MongoDB as a 
... _document_
* a group of related documents is stored inside a...?
... _collection_

* a mongoose Schema compiles into a mongoose _model_
    when we call new on the model it compiles into a new document.