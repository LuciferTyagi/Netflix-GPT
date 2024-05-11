

export const checkValidData = (email, password) => {

    const isEmailVaild = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    // const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

    if (!isEmailVaild) return "Email Id is not Valid"
    if (!isPasswordValid) return "Password  is not Valid"
    // if (!isNameValid) return "Name is not Valid"
    return null;
}