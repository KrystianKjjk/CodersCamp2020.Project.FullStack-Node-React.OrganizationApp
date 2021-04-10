import React, {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal, MuiThemeProvider} from "@material-ui/core";

import BaseService from "../../app/baseService";
import SectionsService from "../../api/sections.service";
import ReusableTable from "../ReusableTable";
import SearchInput from "../SearchInput";

import styles from './FindSection.module.css';
import {mainTheme} from "../../theme/customMaterialTheme";

export interface FindSectionProps {
    isOpen: boolean,
    handleClose: any,
    onSectionSelection: any,
}

const FindSection: React.FC< FindSectionProps > = props => {

    const sectionsService = new SectionsService(new BaseService());

    const [isUpdate, setIsUpdate] = useState(false);
    const [search, setSearch] = useState('');
    const [sections, setSections] = useState<any>([]);
    const [filteredSections, setFilteredSections] = useState<any>([]);

    useEffect(() => {
        getSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        const result = sections.filter((section: any) => {
            return section.name.match(search);
        })
        setIsUpdate(false);
        setFilteredSections([...result]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        setIsUpdate(false);
    },[sections]);

    useEffect(() => {
        setIsUpdate(true);
    },[filteredSections]);

    function onSearch(name: string) {
        setSearch(name);
    }

    function handleRowClick(params: any, e: any) {
        const sectionID = params.row.id;
        const sectionName = params.row.Name;
        props.onSectionSelection(sectionID, sectionName)
    }

    function getSections() {
        sectionsService.getSections()
            .then(res => {
                if(res.status === 200) {
                    setSections([...res.data]);
                    setFilteredSections([...res.data]);
                }
                else throw Error;
            })
            .catch(err => {
            })
    }

    function getSectionsTable(): Promise<[]> {
        const sectionsTmp = filteredSections.map( (section: any) => (
            {
                id: section._id,
                Name: section.name,
                "Start date": new Date(section.startDate).toLocaleDateString(),
                "End date": new Date(section.endDate).toLocaleDateString(),
            } ));
        return Promise.resolve(sectionsTmp);
    }

    const columns = [
        {field: 'Name', width: 270},
        {field: 'Start date', width: 130},
        {field: 'End date', width: 130},
        {field: 'Course Name', width: 250},
    ];

    return (
            <MuiThemeProvider theme={mainTheme}>
                <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={styles.modal}
                        open={props.isOpen}
                        onClose={props.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.isOpen}>
                            <div className={styles.container}>
                                <div className={styles.container__header}>
                                    <span>Find Section</span>
                                </div>

                                <div className={styles.container__body}>
                                    <div className={styles.container__body__search}>
                                        <SearchInput
                                            onSubmit={onSearch}
                                            placeholder='Search by name'
                                        />
                                    </div>
                                    <div className={styles.container__body__table}>
                                        {isUpdate && (<ReusableTable
                                                name="Sections"
                                                getData={getSectionsTable}
                                                columns={columns}
                                                onRowClick={handleRowClick}
                                            /> )}
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
            </MuiThemeProvider>
        )
};

export default FindSection;
