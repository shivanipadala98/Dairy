async function register(username,email,password,mobile,age){
    const requestOptions={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            username:username,
            email:email,
            password:password,
            mobile:mobile,
            age:age
        }),
    };
    return fetch("/register/user",requestOptions);
}

export default register;