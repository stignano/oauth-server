const passport = require("passport");

module.exports = (app) => {
  // Bring user into OAuth flow
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // Get user profile (after a sign-in)
  app.get("/auth/google/callback", passport.authenticate("google"));
};
