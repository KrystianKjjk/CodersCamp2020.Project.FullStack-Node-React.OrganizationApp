import React, {useEffect, useState} from 'react';
import {Backdrop, CssBaseline, Dialog, Fade, Modal, MuiThemeProvider} from "@material-ui/core";

import BaseService from "../../app/baseService";
import { UserService } from "../../api";
import ReusableTable from "../ReusableTable";
import SearchInput from "../SearchInput";

import styles from './FindMentor.module.css';
import mainTheme from "../../theme/customMaterialTheme";

export interface FindMentorProps {
    onMentorSelection: any,
}

const FindMentor: React.FC< FindMentorProps > = props => {

    const usersApi = new UserService(new BaseService());

    const [open, setOpen] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState(true);
    const [search, setSearch] = useState('');
    const [mentors, setMentors] = useState<any>([]);
    const [filteredMentors, setFilteredMentors] = useState<any>([]);

    useEffect(() => {
        getMentors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        const result = mentors.filter((mentor: any) => {
            return mentor.name.match(search);
        })
        setIsUpdate(false);
        setFilteredMentors([...result]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        setIsUpdate(true);
    },[filteredMentors]);

    function onSearch(name: string) {
        setSearch(name);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
    };

    function handleRowClick(params: any, e: any) {
        const mentorID = params.row.id;
        const mentorName = params.row.Name;
        const mentorSurname = params.row.Surname;
        props.onMentorSelection(mentorID, mentorName, mentorSurname)
        handleClose();
    }

    function getMentors() {
        usersApi.getMentors()
            .then(res => {
                setMentors([...res]);
                setFilteredMentors([...res]);
                handleOpen();
            })
            .catch(err => {
            })
    }

    function getMentorsTable(): Promise<[]> {

        const mentorsTmp = filteredMentors.map( (mentor: any) => (
            {
                id: mentor._id,
                Name: mentor.name,
                Surname: mentor.surname
            } ));
        return Promise.resolve(mentorsTmp);
    }

    const columns = [
        {field: 'Name', width: 270},
        {field: 'Surname', width: 250},
    ];

    return (
        <>
            <CssBaseline />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                
                <Fade in={open}>
                    <div className={styles.container}>
                        <div className={styles.container__header}>
                            <span>Find Mentor</span>
                        </div>

                        <div className={styles.container__body}>
                            <div className={styles.container__body__search}>
                                <SearchInput
                                    onSubmit={onSearch}
                                    placeholder='Search by surname'
                                />
                            </div>
                            <div className={styles.container__body__table}>
                                {isUpdate &&
                                    (<ReusableTable
                                        name=""
                                        getData={getMentorsTable}
                                        columns={columns}
                                        onRowClick={handleRowClick}
                                    />)
                                }
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            </>
        )
};

export default FindMentor;
