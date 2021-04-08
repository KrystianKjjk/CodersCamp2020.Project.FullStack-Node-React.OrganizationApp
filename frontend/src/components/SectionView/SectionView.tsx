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
import UButton from "../UButton";
import StyledTextField from '../StyledTextField';
import DateFnsUtils from '@date-io/date-fns'; 
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";

export interface SectionViewProps {
  editMode?: boolean;
}

const SectionView: React.FC< SectionViewProps > = (editMode) => {
  const sectionService = new SectionService();
  const [sectionName, setSectionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [referenceProject, setReferenceProject] = useState("");
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { id } = useParams();

  const deleteSection = () => {
    console.log('test');
  }

  const editSection = () => {
    console.log('test');
  }

  const saveSection = () => {
    console.log('test');
  }

  const handleSectionNameChange = (e: any) => {
    setSectionName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const displayFormattedDate = (date: Date | null) => {
    if (!date) return '';

    return `${date.toLocaleDateString()}`;
  }

  const getOneSectionData = async () => {
    const data = await sectionService.getOneSection(id);

    setSectionName(data.name);
    setCourseName(data.courseName);
    setDescription(data.description || '');
    setStartDate(data.startDate || null);
    setEndDate(data.endDate || null);
    setReferenceProject(data.referenceProjectName || '');
  };
  
  useEffect(() => {
      getOneSectionData();
  }, [])

  const renderButtonEditSave = () => {
    if (isInEditMode) {
      return (
        <span onClick={saveSection} className={styles.editButton} aria-label='Save section'>
          <UButton text='SAVE' color='primary' onClick={() => setIsInEditMode(true)}/>
          </span>
      )
    } else {
      return (
        <span onClick={editSection} className={styles.editButton} aria-label='Edit section'>
          <UButton text='EDIT' color='primary' onClick={() => setIsInEditMode(true)}/>
          </span>
      )
    }
  }

  const renderSectionName = () => {
    if (isInEditMode) {
      return (
        <div className={styles.textFieldSectionName}>
        <StyledTextField
          value={sectionName}
          onChange={e => setSectionName(e.target.value)}
          onBlur={() => console.log({sectionName})}
        /></div>
      )
    } else {
      return (
        <span className={styles.section_title}> {sectionName} </span>
      )
    }
  }

  const renderDescription = () => {
    if (isInEditMode) {
      return (
        <div className={styles.textFieldDescription}>
        <StyledTextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline={true}
          onBlur={() => console.log({description})}
        /></div>
      )
    } else {
      return (
        <span> Description: {description} </span>
      )
    }
  }

  return (
    <Container className={styles.manageSections} aria-label='Manage Section'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>SECTION/SECTION ID</h2>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Section</h2>
          <div className={styles.buttonContainer}>
          <span onClick={deleteSection} className={styles.deleteButton} aria-label='Delete section'>
            <UButton text='DELETE' color='secondary' onClick={console.log("string")}/>
          </span>
          {renderButtonEditSave()}
          </div>
        </div>
        <div className={styles.manageDescription}>
          {renderSectionName()}
          <span className={styles.course_title}> {courseName}</span>
          {renderDescription()}
        </div>
          <div className={styles.manageSectionInfo}> 
            <div className={styles.manageSectionMaterial}> 
              <h3>Materials:</h3>
              <span>Introduction</span>
            </div>
            <div className={styles.manageSectionDates}> 
              <h3>Dates:</h3>
              <div className={styles.textFieldDateContainerOnEdit}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    disableToolbar={!isInEditMode}
                    disabled={!isInEditMode}
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label="Start date"
                    inputVariant="outlined"
                    value={startDate}
                    onChange={e => setStartDate(e)}
                  />
                  <DatePicker
                    disableToolbar={!isInEditMode}
                    disabled={!isInEditMode}
                    variant="inline"
                    format="dd/MM/yyyy"
                    id="date-picker-inline"
                    label="End date"
                    inputVariant="outlined"
                    autoOk
                    value={endDate}
                    onChange={e => setEndDate(e)}
                  />
                  </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className={styles.manageSectionRefPro}> 
              <h3>Reference project:</h3>
              <p>{referenceProject}</p>
            </div>
        </div>
        </Paper>
    </Container>
  );
};

export default SectionView;