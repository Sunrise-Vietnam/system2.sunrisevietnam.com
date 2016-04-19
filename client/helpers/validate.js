invalidPassword = function(pwd){
    var pw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return !(pw.test(pwd));
};
invalidEmail = function(email){
    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return !(emailRegex.test(email));
}