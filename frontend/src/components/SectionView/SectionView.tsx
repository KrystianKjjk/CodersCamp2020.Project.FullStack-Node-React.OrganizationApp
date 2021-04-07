import React, { useEffect, useState } from 'react';
import styles from './SectionView.module.css';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper, TextField } from '@material-ui/core';
import BaseService from '../../app/baseService';
import { useParams } from 'react-router-dom';
import SectionService from '../../api/Section.service';

export interface SectionViewProps {
}

const SectionView: React.FC< SectionViewProps > = () => {
  const sectionService = new SectionService();
  const [sectionName, setSectionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [referenceProject, setReferenceProject] = useState("")
  const { id } = useParams();

  const deleteSection = () => {
    console.log('test');
  }

  const editSection = () => {
    console.log('test');
  }

  const handleSectionNameChange = (e: any) => {
    setSectionName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const displayFormattedDate = (date?: Date) => {
    if (!date) return '';

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  const getOneSectionData = async () => {
    const data = await sectionService.getOneSection(id);

    setSectionName(data.name);
    setCourseName(data.courseName);
    setDescription(data.description || '');
    setStartDate(displayFormattedDate(data.startDate));
    setEndDate(displayFormattedDate(data.endDate));
    setReferenceProject(data.referenceProjectName || '');
  };
  
  useEffect(() => {
      getOneSectionData();
  }, [])

  return (
    <Container className={styles.manageSections} aria-label='Manage Section'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>SECTION/SECTION ID</h2>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Section</h2>
          <span onClick={deleteSection} className={styles.deleteButton} aria-label='Delete section'>
            <DeleteButton text='Delete'/>
          </span>
          <span onClick={editSection} className={styles.editButton} aria-label='Edit section'>
            <AddButton text='Edit'/>
          </span>
        </div>
        <div className={styles.manageDescription}>
          <span className={styles.section_title}> {sectionName} </span>
          <span> {courseName}</span>
          <span> description: {description} </span>
        </div>
          <div className={styles.manageSectionInfo}> 
            <div className={styles.manageSectionMaterial}> 
              <h3>Material:</h3>
              <span>One</span>
            </div>
            <div className={styles.manageSectionDates}> 
              <h3>Dates:</h3>
              <p>{startDate}</p>
              <p>{endDate}</p>
            </div>
            <div className={styles.manageSectionRefPro}> 
              <h3>Referenece project:</h3>
              <p>{referenceProject}</p>
            </div>
        </div>
        </Paper>
    </Container>
  );
};

export default SectionView;