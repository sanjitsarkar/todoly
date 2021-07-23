const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy

const User  = require("../models/User")

const GOOGLE_CALLBACK_URL = "http://localhost:5000/auth/google/callback"

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:GOOGLE_CALLBACK_URL,
            passReqToCallback:true
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const userExist = await User.findOne({ googleId: profile.id })
            if (!userExist) {
                try {
                    const user = await User({
                fullName: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                picture: profile.photos[0].value,
                googleId: profile.id
            }).save()
                    console.log("user",user);
                    if (user) return cb(null, user );
                }
                catch (e) {
                    console.log("Error signing up", err);
                    cb(err, null)
                }
                
            }
        
            else {
                if (userExist) return cb(null, userExist );
            }
        }
    )
)

passport.serializeUser((user, cb) => {
    console.log("Serializing user: ", user);
  cb(null,user.googleId)  
})
passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findOne({ googleId: id })
         console.log("Deserializing user: ", user);

              if (user) return cb(null, user);
    }
    catch (err) {
          console.log("Error deserializing ", err);
        cb(err, null)
     }

   
        
      
    // }
    // );
   
 
}
)