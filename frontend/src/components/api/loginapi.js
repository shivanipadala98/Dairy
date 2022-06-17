async function login(email, password) {
    console.log("In post function");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
    //console.log(requestOptions);
    return await fetch("/login", requestOptions);
    //return fetch("/login", requestOptions).then((response) => response.json());
  }
  
  export default login;