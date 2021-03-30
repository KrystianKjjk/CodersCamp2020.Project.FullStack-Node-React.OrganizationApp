import React, {useState} from 'react';
import styles from './ManageGrades.module.css';
import {IGrade} from "../../models/user.model";

export interface ManageGradesProps {

}

const ManageGrades: React.FC< ManageGradesProps > = props => {

    const [grades, setGrades] = useState<IGrade[] | undefined>(undefined);
    const [gradeEdit, setGradeEdit] = useState<Array<boolean>>([]);


    function toggleGradeEdit(index: number) {
        let edits = [...gradeEdit];
        edits[index] = !edits[index];
        setGradeEdit(
            [...edits],
        )
    }

    function saveGrade(index: number) {
        if('_id' in grades![index]) {
            updateGrade(grades![index]);
        }
        else {
            postGrade(grades![index]);
        }
        toggleGradeEdit(index);
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
        toggleGradeEdit(tmpGrades.length - 1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.container__header}>
                <span>User Grades</span>
                <div className={styles.container__header__button}>
                    <button
                        className={`${styles.button__blue} ${styles.button}`}
                        onClick={addGrade}
                    >ADD</button>
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
                                            0 : (grade.testPoints/grade.testMaxPoints * 100)) }%</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.manageUserForm__row}>
                                <div className={styles.manageUserForm__row__key}>
                                    <label htmlFor="test">Task</label>
                                </div>
                                <div className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
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
                                            0 : (grade.taskPoints/grade.taskMaxPoints * 100)) }%</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.manageUserForm__row}>
                                <div className={styles.manageUserForm__row__key}>
                                    <label htmlFor="test">Project</label>
                                </div>
                                <div className={`${styles.manageUserForm__row__value} ${styles.manageUserForm__row__value__grades}`}>
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
                            onClick={() => deleteGrade(grade._id)}
                        >DELETE</button>
                        {gradeEdit[index] ?
                            (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={() => saveGrade(index)}
                                >SAVE</button>
                            ) : (
                                <button
                                    className={`${styles.button__blue} ${styles.button}`}
                                    onClick={() => toggleGradeEdit(index)}
                                >EDIT</button>
                            )
                        };
                    </div>

                ))}
            </div>
        </div>
  );
};

export default ManageGrades;
