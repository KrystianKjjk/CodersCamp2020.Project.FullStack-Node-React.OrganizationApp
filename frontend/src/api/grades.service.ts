import {IGrade} from "../models/user.model";
import BaseService from "../app/baseService";

export default class GradeService {

    endpoint: string = '';
    httpConfig = {};

    constructor(private baseEndpoint: string, private httpService: BaseService) {
        this.endpoint = `${baseEndpoint}/grades`
        this.httpConfig = {
            headers: { 'x-auth-token': localStorage.getItem('token') }
        }
    };

    async getGrades(userID: string) {
        return this.httpService.get(`${this.endpoint}/${userID}`,this.httpConfig);
    }
    async createGrade(userID: string, grade: IGrade) {
        return this.httpService.post(`${this.endpoint}/${userID}`, grade, this.httpConfig);
    }
    async updateGrade(gradeID: string, grade: IGrade) {
        return this.httpService.patch(`${this.endpoint}/${gradeID}`, grade, this.httpConfig);
    }
    async deleteGrade(gradeID: string) {
        return this.httpService.delete(`${this.endpoint}/${gradeID}`,this.httpConfig);
    }
}




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
