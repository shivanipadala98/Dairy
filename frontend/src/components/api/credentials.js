async function getAllCredentials(){
    const requestOptions = {
        method:"GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    return fetch('/credentials/view',requestOptions);
}

async function createCredentials(platform,username,password){
    const requestOptions={
        method:"POST",
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            platform:platform,
            username:username,
            password:password
        }),
    };
    return fetch("/credentials/create",requestOptions);
}

async function deleteCredentials(id){
    const requestOptions={
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
        }
    }
    return fetch(`credentials/delete/${id}`,requestOptions);
}

async function updateCredentials(platform,username,password,id){
    const requestOptions={
        method:"PUT",
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`,
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            platform:platform,
            username:username,
            password:password,
            id:id
        })
    }
    return fetch("credentials/update",requestOptions);
}

export {createCredentials,getAllCredentials,deleteCredentials,updateCredentials};
