const mongoose= require('mongoose');

const db= process.env.DATABASE;

const connectMongo = async () => {
    try {
        console.log("connecting to mongoose");
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connection successful");
    } 
    catch(err) {
        console.log("error in connection-->"+err);
    }
}

connectMongo();