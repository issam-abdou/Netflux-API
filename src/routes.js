
import MovieModel from "./Models/Movie"; // ########  ماتنساهاش #######
import UserModel from "./Models/User"; // ########  ماتنساهاش #######
import * as Joi from "@hapi/joi";
import { hashPassword } from "./helper";
var jwt = require('jsonwebtoken');




const steupRoutes = (app)=>{
    // =========== GET requests ================//
    app.get('/', (req, res) => {
        res.send('=============== Hello World! Express is running ==============')
    })
    // 1-Response if the url is ='/movies'
    app.get('/movies',async(req,res)=>{
        try {
        // GET TOKEN FROM HEADERS
        const token = req.headers.authorization;
        // VERIFY TOKEN
        if (!token) {
            res.statusCode = 401;
            res.send('YOU HAVE NO PERMISSION ( no token found )')
            return;
        }
        // DECODE TOKEN
        const decodedToken = jwt.decode(token)
        console.log('Decoed token is --->  '+ decodedToken);
        console.log(decodedToken.sub);
        // FIND USER WITH THIS TOKEN
        const user = await UserModel.findById(decodedToken.sub)
        if (!user) {
            res.statusCode = 404;
            res.send('YOU HAVE NO PERMISSION ---> no user found')
            return;
        }
        // VERIFY EXPIRATION OF TOKEN
        jwt.verify(token,user.salt)
        const conditions = {}
        if (req.query.genre) {
            conditions.genres = {$in: [req.query.genre]}; 
        } 
        let moviesFromDB = await MovieModel.find(conditions)
        res.send(moviesFromDB)
        } catch (error) {
            res.statusCode = 401;
            res.send(error.message)
        }
        
        
    })
    
    // 2 filter by year + genres (using : params + queries)
    app.get('/movies/:year',async(req,res)=>{

        // ==== CHECKING THAT THE YEAR IS A NUMBER USING "JOI"====//
        const paramSchema = Joi.object({
            year: Joi.number().required()
        });
        const resultValidation = paramSchema.validate(req.params)
        if (resultValidation.error) {
            res.statusCode= 400;
            res.send(resultValidation.error.details[0].message)
            return
        }

        try {
            let conditions = {
                $text:{$search:req.params.year.toString()} // we convert req.params.year from number to string.
            }
            if (req.query.genre) {
                conditions.genres = {$in : [req.query.genre]}
            }
            MovieModel.createIndexes( { releaseDate: "text"} ); // create index that allow us to search a string inside releaseDate
        
            let moviesFromDB = await MovieModel.find(conditions)
            res.send(moviesFromDB);
        } catch (error) {
            console.log(error);
        }
        
    })
     //3- Response if the url is not '/' or '/movies' يعني الرد لجميع الحالات التي لم تعالج من قبل
     app.get('*',(req,res)=>{
        res.send('Noooooooooooot Found')
    })

    // =========== POST requests ================//
    
    // ------ REGISTER USER -----
    //############### CREATE NEW USER ( new EndPoint ) + Check existed USERS #############
    
    app.post('/user/register',async (req,res)=>{
        console.log('=====> '+ req.body)
        // receive user info from requeste
        const {name, email, password, birthdate} = req.body;
        
        // Define the schema of the body (for Joi)
        const bodySchema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().min(6).required(),
            birthdate: Joi.string().required()
        })

        // Validate the "req.body" with the "bodySchema"
        const validationResult = bodySchema.validate(req.body);
        //console.log(validationResult);
        if (validationResult.error) {
            res.statusCode = 400;
            res.send(validationResult.error.details[0].message)
            return
        }

        

        // Checking if the user exist in DB is handled by mongoose automatically
        try {
            // create new user in DB
            const newUser = new UserModel({
                name,
                email,
                password,
                birthdate
            })
            // save the new user  
            await newUser.save();
            // send response
            res.send(newUser)
            
        } catch (error) {
            res.statusCode = 400;
            res.send(error.message)
            console.log(error.message);
        }
        
    })
    
    
    // ------ LOGIN USER -----
    app.post('/user/login',async(req,res)=>{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email})
        if (!user) {
            res.statusCode = 401;
            res.send('USER NOT FOUND')
        } else {
            if (user.password === hashPassword(password,user.salt)) {
                const token = jwt.sign({sub: user._id},user.salt,{expiresIn: 30})
                res.send (`Your Token is -->  ${token}`)
            } else {
                res.statusCode = 403;
                res.send('PASSWORD INCORRECT')
            }
        }
    })

    // =========== PUT requests ================//
    app.put('/user/:id',async(req,res)=>{

        // receive the id
        const {id} = req.params;
        // check if there is a user with that id
        const user = await UserModel.findById(id)

        if (!user) {
            res.statusCode = 404;
            res.send('ID NOT CORRECT');
        } else {
            // receive the new birthdate
            const {birthdate} = req.body;
            if (birthdate) {
                // update the birthdate of the user
                user.birthdate = birthdate;
                // save the changes
                user.save()
            }
            res.send(user)
        }

        
    })

}

export default steupRoutes;




/* #### PUT explanation #####
- in this part we will add the possibility of updating the info of the user.
- we use PUT request , so we create a new route insidet the steupRoute() function
- this new route will contain the "id" of the user instead of "/../.." 
- we will search in DB for a user with this id using a function of mongoose ".findById()" ==> const user = await UserModel.findById(id)
- so we will chech the "id " of the user :
    * if there is a user with this "id" ==> we update his [birthdate]
    * if NOT ==> we send a "ID IS NOT FOUND"
- if there is a user :
    * we receive the new info form "req.body"
    * we will have 02 cases :
        - if there is a new birthdate send ==> we upadate it + save the change + send the user info.
        - if NOT : we will just send the all user info

- we test All this with POSTAMAN ==> we use a correct id from DB to test .

*/

/* ######## 08 ##############
- FIRST:
- Before, To prevent REGISTERIN an existing user we was cheking the email using a code that we wrote it by ourselves
==> the code :
- in this section we will use mongoose to do this :
    * so we will modify the schama in the User.js file
    * inside the userSchema ==> email: {type: String, unique: true}, instead of "email: String";
- Now , when the user try to register with an existing email in the DB ==> mongoose will STOP him and produce an error.
- So we will remove all the old code and we should add this time "await" to "newUser.save()" because it's a PROMISE and we must wait it to do the NEXT STEP.
- Also, we write the code when there is an ERROR using "catch(errorà{}"
===> Code : =============================
app.post('/user/register',async (req,res)=>{
        console.log('=====> '+ req.body)
        // receive user info from requeste
        const {name, email, password, birthdate} = req.body;
        // Checking if the user exist in DB is handled by mongoose automatically
        try {
            // create new user in DB
            const newUser = new UserModel({
                name,
                email,
                password,
                birthdate
            })
            // save the new user  
            await newUser.save();
            // send response
            res.send(newUser)
            
        } catch (error) {
            res.statusCode = 400;
            res.send(error.message)
        }
        
    })
    ==============================================

*/
/*
 * يوجد 03 مسارات GET
- المسار [app.get('/students',...))]  يسمح باعادة كل الطلاب.
- يمكن عمل فلتر للطلاب على حسب المدينة باستعمال : (=students?city/)
- يمكن عمل فلتر على حسب اسم الطالب باستعمال:  (=students?name/) 
- لايمكن الحصول على قائمة الطلاب و لا على اي طالب الا بعد تسجيل الاستاذ و ارسال التوكن الخاص به في ال header.


*يوجد 03 مسارات POST 
- الاول لانشاء حساب للاستاذ.
- الثاني لتسجيل دخول الاستاذ ،   بعد تسجيل دخول الاستاذ يتم عمل توكن خاص به و يتم ارسال هذا التوكن فيheader  الخاص ب response على الشكل : req.header("auth-token").
- الثالث لاضافة طالب جديد --> هذا المسار يستلزم ان يكون الاستاذ مسجل في الموقع و أن يتم إرسال الوكن الخاص به في الHEADER و لقد قمت بإضافة عملية تحقق من التوكن داخل هذا المسار



* يوجد مسار واحد PUT 
- لتعديل معلومات الطالب --> هذا المسار يستلزم ان يكون الاستاذ مسجل في الموقع و أن يتم إرسال الوكن الخاص به في الHEADER
- قمت بإضافة عملية تحقق من التوكن داخل هذا المسار

* يوجد مسار واحد DELETE
- لتعديل معلومات الطالب --> هذا المسار يستلزم ان يكون الاستاذ مسجل في الموقع و أن يتم إرسال الوكن الخاص به في الHEADER.
- قمت بإضافة عملية تحقق من التوكن داخل هذا المسار

في البداية قائمة الطلاب و الاساتذة هي فارغة لذا يجب اضافة الاساتذة ثم الطلبة 
*/