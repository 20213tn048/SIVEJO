const {app} = require("./config/express");
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server corriendo en servidor local:${app.get(`port`)}/`);

};
main();