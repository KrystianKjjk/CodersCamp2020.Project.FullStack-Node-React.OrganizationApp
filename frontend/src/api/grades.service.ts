import baseService from "../app/baseService";
import {IGrade} from "../models/user.model";

/*



function postGrade(grade: IGrade) {
    fetch(`${gradeEndpoint}${userID}`,
        {
            method: "POST",
            headers: {
                'x-auth-token': token,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(grade),
        })
        .then(result => {
            if(!result.ok) alert("something went wrong");
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
        });

}
function updateGrade(grade: IGrade) {
    fetch(`${gradeEndpoint}${grade._id}`,
        {
            method: "PATCH",
            headers: {
                'x-auth-token': token,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(grade),
        })
        .then(result => {
            if(!result.ok) alert("something went wrong");
        })
        .catch(error => {
            setIsLoaded(true);
            setError(error);
        });
}

function deleteGrade(id: string) {
    const gradeEndpointDelete = gradeEndpoint + id;
    fetch(gradeEndpointDelete,
        {
            method: "DELETE",
            headers: {
                'x-auth-token': token
            },
        })
        .then(result => {
            if(result.ok){
                alert("deleted");
                getUser();
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
*/
