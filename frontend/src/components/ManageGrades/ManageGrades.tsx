import React, {useEffect, useState} from 'react';

import BaseService from "../../app/baseService";
import GradeService from "../../api/grades.service";
import {IGrade} from "../../models/user.model";

import styles from './ManageGrades.module.scss';


export interface ManageGradesProps {
    userID: string
}

const ManageGrades: React.FC< ManageGradesProps > = props => {

    const baseAPIUrl = `https://coders-camp-organization-app.herokuapp.com/api`;

    const gradeService = new GradeService(baseAPIUrl, new BaseService());

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [gradeEdit, setGradeEdit] = useState<Array<boolean>>([]);

    useEffect(() => {
        getGrades(props.userID);
    },[]);

    function toggleEdit(index: number) {
        let edits = [...gradeEdit];
        edits[index] = !edits[index];
        setGradeEdit(
            [...edits],
        )
    }

    function handleInputChangeGrade(event: React.ChangeEvent<HTMLInputElement>) {
        const target: HTMLInputElement = event.target;
        const index = +target.id;
        const name = target.name;
        const value = target.value;

        let tmpGrades: IGrade[] = [ ...grades as IGrade[] ];
        let grade = tmpGrades[index];
        // @ts-ignore
        grade[name] = +value;
        tmpGrades[index] = grade;

        setGrades(
            [...tmpGrades]
        )
    }

    function getGrades(userID: string) {
        setIsLoaded(false);
        gradeService.getGrades(userID)
            .then(res => {
                setIsLoaded(true);
                if(res.status === 200) {
                    setGrades([...res.data]);
                }
                else throw Error;
            })
            .catch(err => {
                setIsLoaded(true);
                setError(err);
            })
    }

    function deleteGrade(index: number) {
        if('_id' in grades![index]) {
            gradeService.deleteGrade(grades![index]._id);
            const tmpGrades = grades;
            tmpGrades.splice(index, 1);
            setGrades(
                [...tmpGrades]
            )
        }
        else {
            const tmpGrades = grades;
            tmpGrades.splice(index, 1);
            setGrades(
                [...tmpGrades]
            )
            toggleEdit(index);
        }
    }

    function saveGrade(index: number) {
        if('_id' in grades![index]) {
               gradeService.updateGrade(grades![index]._id, grades![index]);
        }
        else {
               gradeService.createGrade(props.userID, grades![index])
                   .then( res => {
                       if(res.status === 201) {
                           let tmp = [...grades];
                           tmp[index]._id = res.data._id;
                           setGrades([...tmp]);
                       }
                   })
                   .catch(err => {
                       setIsLoaded(true);
                       setError(err);
                   })
        }
        toggleEdit(index);
    }

    function addGrade(event: any) {
        let tmpGrades = [ ...grades as IGrade[] ];
        let tmpGrade: Omit<IGrade, "_id"> = {
            sectionId: '604b5ab050dd92462cc4ede2',
            testPoints: 0,
            testMaxPoints: 0,
            taskPoints: 0,
            taskMaxPoints: 0,
            projectPoints: 0
        }
        //@ts-ignore
        tmpGrades.push(tmpGrade);
        setGrades(
            [...tmpGrades]
        )
        toggleEdit(tmpGrades.length - 1);
    }

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <span>User Grades</span>
                    <div className={styles.container__header__button}>
                        <button
                            className={`${styles.button__blue} ${styles.button}`}
                            onClick={addGrade}
                        > ADD </button>
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
                                    <div
                                        className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                        {gradeEdit[index] ? (
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
                                                0 : (grade.testPoints / grade.testMaxPoints * 100))}%</p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.manageUserForm__row}>
                                    <div className={styles.manageUserForm__row__key}>
                                        <label htmlFor="test">Task</label>
                                    </div>
                                    <div
                                        className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                        {gradeEdit[index] ? (
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
                                                0 : (grade.taskPoints / grade.taskMaxPoints * 100))}%</p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.manageUserForm__row}>
                                    <div className={styles.manageUserForm__row__key}>
                                        <label htmlFor="test">Project</label>
                                    </div>
                                    <div
                                        className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
                                        {gradeEdit[index] ? (
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
                                    onClick={() => deleteGrade(+index)}
                            > DELETE </button>

                            {gradeEdit[index] ?
                                (
                                    <button
                                        className={`${styles.button__blue} ${styles.button}`}
                                        onClick={() => saveGrade(index)}
                                    >SAVE</button>
                                ) : (
                                    <button
                                        className={`${styles.button__blue} ${styles.button}`}
                                        onClick={() => toggleEdit(index)}
                                    >EDIT</button>
                                )}
                        </div>

                    ))}
                </div>
            </div>
        );
    }
};

export default ManageGrades;
