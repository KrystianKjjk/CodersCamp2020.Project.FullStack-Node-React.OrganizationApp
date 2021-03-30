import React, {useEffect, useState} from 'react';

import BaseService from "../../app/baseService";
import SectionsService from "../../api/sections.service";

import styles from './FindSection.module.scss';


export interface FindSectionProps {

}

const FindSection: React.FC< FindSectionProps > = props => {

    const baseAPIUrl = `https://coders-camp-organization-app.herokuapp.com/api`;

    const sectionsService = new SectionsService(baseAPIUrl, new BaseService());

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sections, setSections] = useState<any>([]);

    useEffect(() => {
        getSections();
    },[]);

    function getSections() {
        sectionsService.getSections()
            .then(res => {
                setIsLoaded(true);
                if(res.status === 200) {
                    setSections([...res.data]);
                }
                else throw Error;
            })
            .catch(err => {
                setIsLoaded(true);
                setError(err);
            })
    }

    if (error) {
        return <div className={styles.error}>Error</div>;
    } else if (!isLoaded) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.container__header}>
                    <span>Find Section</span>
                </div>

                <div className={styles.container__body}>

                    {sections?.map((section: any) => (

                        <div className={styles.gradeContainer}>
                            <div className={styles.gradeContainer__header}>
                                <span>Section name {section.name}</span>
                            </div>
                        </div>
                            ))}
                </div>
            </div>
        )}
};

export default FindSection;
