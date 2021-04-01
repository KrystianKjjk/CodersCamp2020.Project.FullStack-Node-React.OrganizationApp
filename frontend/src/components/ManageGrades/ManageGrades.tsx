import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import SectionsService from "../../api/sections.service";
import BaseService from "../../app/baseService";
import GradeService from "../../api/grades.service";
import {IGrade} from "../../models/user.model";
import UButton from "../UButton";
import FindSection from "../FindSection";

import styles from './ManageGrades.module.css';

export interface ManageGradesProps {
    userID: string
}

export interface ISectionsUtility {
    _id: string,
    name?: string
}

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageGrades: React.FC< ManageGradesProps > = props => {

    const gradeService = new GradeService(new BaseService());
    const sectionService = new SectionsService(new BaseService());

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState<Array<boolean>>([]);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);

    const [openSectionsModal, setOpenSectionsModal] = useState(false);
    const [grades, setGrades] = useState<IGrade[]>([]);
    const [sections, setSections] = useState<ISectionsUtility[]>([]);

    useEffect(() => {
        getGrades(props.userID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function toggleEdit(index: number) {
        let edits = [...isEdit];
        edits[index] = !edits[index];
        setIsEdit(
            [...edits],
        )
    }

    function handleInputChangeGrade(event: React.ChangeEvent<HTMLInputElement>) {
        const target: HTMLInputElement = event.target;
        const index = +target.id;
        const name = target.name;
        const value = +target.value;

        let tmpGrades: IGrade[] = [ ...grades as IGrade[] ];
        let grade = tmpGrades[index];
        // @ts-ignore
        grade[name] = +value;
        tmpGrades[index] = grade;

        setGrades(
            [...tmpGrades]
        )
    }

    function getSectionNames(sections: ISectionsUtility[]) {
        const tmpSections: ISectionsUtility[] = [...sections];
        if(sections.length){
            sections.forEach( (section: ISectionsUtility, index: number) => {
                sectionService.getSectionByID(section?._id)
                    .then( res => {
                        if(res.status === 200) {
                            tmpSections[index] = {_id: res.data._id, name: res.data.name};
                            setSections([...tmpSections]);
                        }
                    })
                    .catch(err => {
                        tmpSections[index] = {_id: section?._id, name: 'no section'};
                        setSections([...tmpSections]);
                    });
            });
        }
    }

    function getGrades(userID: string) {
        setIsLoaded(false);
        gradeService.getGrades(userID)
            .then(res => {
                if(res.status === 200) {
                    setIsLoaded(true);
                    setGrades([...res.data]);

                    let tmpSections: ISectionsUtility[] = res.data.map( (grade: IGrade) => ({_id: grade.sectionId}));
                    setSections([...tmpSections]);
                    getSectionNames(tmpSections)
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
            gradeService.deleteGrade(grades![index]._id)
                .then(res => {
                    if(res.status===200) {
                        const tmpGrades = [...grades];
                        tmpGrades.splice(index, 1);
                        setGrades(
                            [...tmpGrades]
                        )
                        const tmpSections = [...sections];
                        tmpSections.splice(index, 1);
                        setSections(
                            [...tmpSections]
                        )
                        setOpenSuccessAlert(true);
                    }
                    else throw Error;
                })
                .catch( err => {
                    setOpenErrorAlert(true);
                })
        }
        else {
            const tmpGrades = grades;
            tmpGrades.splice(index, 1);
            setGrades(
                [...tmpGrades]
            )
            const tmpSections = [...sections];
            tmpSections.splice(index, 1);
            setSections(
                [...tmpSections]
            )
            toggleEdit(index);
            setOpenSuccessAlert(true);
        }
    }

    function saveGrade(index: number) {
        if('_id' in grades![index]) {
               gradeService.updateGrade(grades![index]._id, grades![index])
                   .then( res => {
                       if(res.status === 201) setOpenSuccessAlert(true);
                       else throw Error;

                       toggleEdit(index);
                   })
                   .catch(err => {
                       setOpenErrorAlert(true);
                   })
        }
        else {
               gradeService.createGrade(props.userID, grades![index])
                   .then( res => {
                       if(res.status === 201) {
                           let tmp = [...grades];
                           tmp[index]._id = res.data._id;
                           setGrades([...tmp]);
                           setOpenSuccessAlert(true);
                           toggleEdit(index);
                       }
                       else throw Error;
                   })
                   .catch(err => {
                       setOpenErrorAlert(true);
                   })
        }
    }

    function addGrade(event: any) {
        let tmpGrades = [ ...grades as IGrade[] ];
        let tmpGrade: Omit<IGrade, "_id"> = {
            sectionId: '',
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
        );
        let tmpSections = sections;
        tmpSections.push({_id: 'exampleID'});
        setSections([...tmpSections]);

        toggleEdit(tmpGrades.length - 1);
    }

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccessAlert(false);
        setOpenErrorAlert(false);
    };
    function handleSectionSelection(index: number){
        return function onSectionSelection(sectionID: string, sectionName: string) {

            setOpenSectionsModal(false)
            let tmpGrades = [...grades];
            tmpGrades[index].sectionId = sectionID;
            setGrades([...tmpGrades]);

            let tmpSections = [...sections];
            tmpSections[index].name = sectionName;
            setSections([...tmpSections]);
        }
    }


    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <CircularProgress className={styles.loading}/>
    } else {
        return (
            <Box className={styles.container}>

                <Snackbar open={openSuccessAlert} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Success!
                    </Alert>
                </Snackbar>
                <Snackbar open={openErrorAlert} autoHideDuration={3500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Fail!
                    </Alert>
                </Snackbar>

                <Box display="flex" className={styles.container__header}>
                    <span>Manage Grades</span>
                        <UButton
                            text='ADD'
                            color='primary'
                            onClick={addGrade} />
                </Box>
                <Box display="flex" flexWrap="wrap">
                    {grades?.map((grade, index) => (

                        <div className={styles.gradeContainer}>

                            { openSectionsModal && isEdit[index]
                            && (<FindSection onSectionSelection={handleSectionSelection(index)}/>)}

                                <div className={styles.gradeContainer__header}>
                                <span>{sections[index]?.name}</span>
                                {isEdit[index] && (
                                <UButton
                                    text='CHANGE'
                                    color='primary'
                                    onClick={() => setOpenSectionsModal(true)} />
                                    )
                                }
                            </div>

                            <form className={`${styles.gradeContainer__body}`}>
                                <div className={styles.gradeContainer__body__row}>
                                    <div className={styles.gradeContainer__body__row__key}>
                                        <label htmlFor="test">Test</label>
                                    </div>
                                    <div className={`${styles.gradeContainer__body__row__value}`}>
                                        {isEdit[index] ? (
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

                                <div className={styles.gradeContainer__body__row}>
                                    <div className={styles.gradeContainer__body__row__key}>
                                        <label htmlFor="test">Task</label>
                                    </div>
                                    <div
                                        className={`${styles.gradeContainer__body__row__value}`}>
                                        {isEdit[index] ? (
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

                                <div className={styles.gradeContainer__body__row}>
                                    <div className={styles.gradeContainer__body__row__key}>
                                        <label htmlFor="test">Project</label>
                                    </div>
                                    <div
                                        className={`${styles.gradeContainer__body__row__value}`}>
                                        <div>
                                            {isEdit[index] ? (
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
                                </div>

                            </form>
                            <Box display="flex" justifyContent="center">
                                <UButton
                                    text='DELETE'
                                    color='secondary'
                                    onClick={() => deleteGrade(index)} />

                                {isEdit[index] ?
                                    (
                                        <UButton
                                            text='SAVE'
                                            color='primary'
                                            onClick={() => saveGrade(index)} />
                                    ) : (
                                        <UButton
                                            text='EDIT'
                                            color='primary'
                                            onClick={() => toggleEdit(index)} />
                                    )}
                            </Box>
                        </div>

                    ))}
                </Box>
            </Box>
        );
    }
};

export default ManageGrades;
