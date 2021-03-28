import React, {useEffect, useState} from 'react';

import styles from './ManageUser.module.css';

export interface ManageUserProps {

}
enum IRole {
    Candidate,
    Participant,
    Mentor,
    Admin,
};

enum IStatus {
    Active,
    Resigned,
    Archived,
};

interface IGrade {
    _id: string,
    sectionId: string,
    testPoints: number,
    testMaxPoints: number,
    taskPoints: number,
    taskMaxPoints: number,
    projectPoints: number
}

interface IUser {
    name: string,
    surname: string,
    email: string,
    type: IRole,
    status: IStatus,
};

const ManageUser: React.FC< ManageUserProps > = (props: any) => {
    // @ts-ignore
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [grades, setGrades] = useState<IGrade[] | undefined>(undefined);


    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDU3ZTAyMGRhODU2ZTAwMTU4NDViZWEiLCJ0eXBlIjozLCJpYXQiOjE2MTY3OTcxNjgsImV4cCI6MTYxNjc5ODM2OH0.UnY8L7gVH-e3vXr86hxozWcBqOudSUPr9yKlN0RaMyo';

    let userID = props.match.params.userID;

    const userEndpoint = `http://localhost:5000/api/users/${userID}`;
    const gradeEndpoint = 'http://localhost:5000/api/grades/';

    function toggleEdit(){
        setIsEdited(!isEdited);
    }

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
                    updateGrade();
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
    function updateGrade() {
        grades?.forEach(grade => {
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
                    if(result.ok){
                    }
                    else {
                        alert("something went wrong");
                    }
                })
                .catch(error => {
                    setIsLoaded(true);
                    setError(error);
                });
        })
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

                const tmpUser = {
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

     useEffect(() => {
         getUser();
    }, []);

    function handleInputChange(event: any) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        // @ts-ignore
        setUser({
            ...user,
            [name]: value
        })
    }
    function handleInputChangeGrade(event: any) {
        const target: HTMLInputElement = event.target;
        const index = +target.id;
        const name = target.name;
        const value = +target.value;

        // @ts-ignore
        let tmpGrades = [...grades];
        let grade = tmpGrades[index];
        // @ts-ignore
        grade[name] = value;
        tmpGrades[index] = grade;

        setGrades(
            // @ts-ignore
            [...tmpGrades]
       )
    }

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div>
                <div className={styles.container}>
                    <div className={styles.container__header}>
                        <span>Manage user</span>
                        <div className={styles.container__header__button}>
                            <button
                                className={`${styles.button__red} ${styles.button}`}
                                onClick={deleteUser}
                            > DELETE </button>
                            {isEdited ? (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={updateUser}
                                > SAVE </button>
                            ) : (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={toggleEdit}
                                > EDIT </button>
                            )}
                        </div>
                    </div>

                    <form className={styles.manageUserForm}>
                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="status">Status</label>
                            </div>
                            <div className={`${styles.manageUserForm__row__value} ${styles.status_radio_button}`}>
                                {(isEdited || user?.status == IStatus.Active) && (
                                    <div>
                                        <input type="radio"
                                               id="Active"
                                               name="status"
                                               value={IStatus.Active}
                                               checked={user?.status == IStatus.Active}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__blue}`} htmlFor="Active">Active</label>
                                    </div>
                                )
                                  }
                                {(isEdited || user?.status == IStatus.Resigned) && (
                                        <div>
                                        <input type="radio"
                                               id="Resigned"
                                               name="status"
                                               value={IStatus.Resigned}
                                               checked={user?.status == IStatus.Resigned}
                                               onChange={handleInputChange}
                                        />
                                        <label className={`${styles.status_radio_button__red}`} htmlFor="Resigned">Resigned</label>
                                        </div>
                                        )}
                                {(isEdited || user?.status == IStatus.Archived) && (
                                    <div>
                                            <input type="radio"
                                                   id="Archived"
                                                   name="status"
                                                   value={IStatus.Archived}
                                                   checked={user?.status == IStatus.Archived}
                                                   onChange={handleInputChange}
                                            />
                                            <label className={`${styles.status_radio_button__green}`} htmlFor="Archived">Archived</label>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="fname">First Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <input type="text"
                                    id="fname"
                                    name="name"
                                    placeholder={user?.name}
                                    onChange={handleInputChange}/>
                                ) : (
                                    <p>{user?.name}</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="lname">Last Name</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <input type="text"
                                           id="lname"
                                           name="surname"
                                           placeholder={user?.surname}
                                           onChange={handleInputChange}
                                    />
                                    ) : (
                                        <p>{user?.surname}</p>
                                    )}
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <input type="text"
                                           id="email"
                                           name="email"
                                           placeholder={user?.email}
                                           onChange={handleInputChange}
                                    />
                                    ) : (
                                    <p>{user?.email}</p>
                                    )}
                            </div>
                        </div>

                        <div className={styles.manageUserForm__row}>
                            <div className={styles.manageUserForm__row__key}>
                                <label htmlFor="type">Type</label>
                            </div>
                            <div className={styles.manageUserForm__row__value}>
                                {isEdited ? (
                                    <select name="type"
                                            value={user?.type}
                                            onChange={handleInputChange}
                                    >
                                        <option value={IRole.Candidate}>Candidate</option>
                                        <option value={IRole.Participant}>Participant</option>
                                        <option value={IRole.Mentor}>Mentor</option>
                                        <option value={IRole.Admin}>Admin</option>
                                    </select>
                                    ) : (
                                        <p>{IRole[user?.type!]}</p>
                                    )}
                            </div>
                        </div>
                    </form>
                </div>


                <div className={styles.container}>
                    <div className={styles.container__header}>
                        <span>User Grades</span>
                        <div className={styles.container__header__button}>
                            <button className={`${styles.button__blue} ${styles.button}`}>ADD</button>
                        </div>
                    </div>
                    <div className={styles.container__body}>

                        {grades?.map((grade, index) => (

                            <div className={styles.gradeContainer}>
                                <div className={styles.gradeContainer__header}>
                                    <span>Section name</span>
                                </div>

                                <form className={`${styles.manageUserForm}`}>
                                    <div className={styles.manageUserForm__row}>
                                        <div className={styles.manageUserForm__row__key}>
                                            <label htmlFor="test">Test</label>
                                        </div>
                                        <div className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                            {isEdited ? (
                                                <div>
                                                    <input type="text"
                                                           id={`${index}`}
                                                           name="testPoints"
                                                           placeholder={grade?.testPoints?.toString()}
                                                           onChange={handleInputChangeGrade}/>
                                                    <input type="text"
                                                           id={`${index}`}
                                                           name="testMaxPoints"
                                                           placeholder={grade?.testMaxPoints?.toString()}
                                                           onChange={handleInputChangeGrade}/>
                                                </div>
                                            ) : (
                                                <p>{Math.round(grade?.testMaxPoints === 0 ?
                                                    0 : (grade.testPoints/grade.testMaxPoints * 100)) }%</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.manageUserForm__row}>
                                        <div className={styles.manageUserForm__row__key}>
                                            <label htmlFor="test">Task</label>
                                        </div>
                                        <div className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                            {isEdited ? (
                                                <div>
                                                    <input type="text"
                                                           id={`${index}`}
                                                           name="taskPoints"
                                                           placeholder={grade?.taskPoints?.toString()}
                                                           onChange={handleInputChangeGrade}/>
                                                    <input type="text"
                                                           id={`${index}`}
                                                           name="taskMaxPoints"
                                                           placeholder={grade?.taskMaxPoints?.toString()}
                                                           onChange={handleInputChangeGrade}/>
                                                </div>
                                            ) : (
                                                <p>{Math.round(grade.taskMaxPoints === 0 ?
                                                    0 : (grade.taskPoints/grade.taskMaxPoints * 100)) }%</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.manageUserForm__row}>
                                        <div className={styles.manageUserForm__row__key}>
                                            <label htmlFor="test">Project</label>
                                        </div>
                                        <div className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                            {isEdited ? (
                                                    <input type="text"
                                                           id={`${index}`}
                                                           name="projectPoints"
                                                           placeholder={grade?.projectPoints?.toString()}
                                                           onChange={handleInputChangeGrade}/>
                                            ) : (
                                                <p>{grade?.projectPoints}pkt</p>
                                            )}
                                        </div>
                                    </div>

                                </form>

                                <button
                                    className={`${styles.button__red} ${styles.button}`}
                                    onClick={() => deleteGrade(grade._id)}
                                >DELETE</button>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        );
    };
}


export default ManageUser;
