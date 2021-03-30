import {IUser} from "../models/user.model";


function updateUser() {
    fetch(userEndpoint,
        {
            method: "PATCH",
            headers: {
                'x-auth-token': token,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(result => {
            if(result.ok){
                alert("updated");
                toggleEdit();
            }
            else {
                alert("something went wrong");
            }
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
        });
}

function deleteUser() {
    fetch(userEndpoint,
        {
            method: "DELETE",
            headers: {
                'x-auth-token': token
            },
        })
        .then(result => {
            if(result.ok){
                alert("deleted");
            }
            else {
                alert("something went wrong");
            }
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
        });
}

function getUser() {
    fetch(userEndpoint,
        {
            method: "GET",
            headers: {
                'x-auth-token': token
            },
        })
        .then(result => {
            if(result.ok){
                return result.json();
            }
            else {
                throw Error("Not 2xx response");
            }
        })
        .then(result => {
            setIsLoaded(true);

            const tmpUser: Omit<IUser, "_id"> = {
                name: result.name,
                surname: result.surname,
                type: result.type,
                status: result.status,
                email: result.email,
            }
            setUser(tmpUser);
            setGrades(result.grades)
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
        });
}
