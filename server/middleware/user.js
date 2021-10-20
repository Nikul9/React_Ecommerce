const admin = require('../firebase/index')


const authCheck = async (req ,res , next ) => {
    //console.log(req.headers);
    // next()
    try { 
        const fireBaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log("FireBase user is => " , fireBaseUser);
        req.user = fireBaseUser
        next()
    } catch (E) {
        console.log(E);
        res.status(401).json({
            err : "Invalid or expired token"
        })
    }
}