import React, { useEffect, useState } from 'react';
import styles from './SectionView.module.css';
import AddButton from '../AddButton';
import DeleteButton from '../DeleteButton';
import SelectSortBy from '../SelectSortBy';
import SearchInput from '../SearchInput';
import Table from '../ReusableTable';
import { filterData, sortData } from '../ReusableTable/ReusableTableSlice';
import { useAppDispatch } from '../../app/hooks';
import { Container, CssBaseline, Paper, TextField, InputLabel, MenuItem, Select } from '@material-ui/core';
import BaseService from '../../app/baseService';
import { useParams } from 'react-router-dom';
import SectionService from '../../api/Section.service';
import { SectionData } from '../../models/Section.model';
import { Course } from '../../models/Course.model';
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
import CoursesService from '../../api/courses.service';

export interface SectionViewProps {
  editMode?: boolean;
}

const SectionView: React.FC< SectionViewProps > = (editMode) => {
  const sectionService = new SectionService();
  const [sectionName, setSectionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [referenceProject, setReferenceProject] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { id } = useParams<Record<'id', string>>()

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

  const displayFormattedDate = (date: Date | undefined) => {
    if (!date) return '';

    return `${date.toLocaleDateString()}`;
  }

  const getOneSectionData = async () => {
    const data = await sectionService.getOneSection(id);

    setSectionName(data.name);
    setCourseName(data.courseName);
    setCourseId(data.courseId);
    setDescription(data.description || '');
    setStartDate(data.startDate || undefined);
    setEndDate(data.endDate || undefined);
  };

  const getCourseData = async () => {
    const data = await sectionService.getCourses();
    setCourses(data);
  };

  const getProjectData = async () => {
    const project = await sectionService.getProjectForSection(id);
    setReferenceProject(project.projectName);
  };
  
  useEffect(() => {
      getOneSectionData();
      getCourseData();
      getProjectData();
  }, []);

  const saveSection = async () => {
    const sectionToUpdate: SectionData = {
      _id: id,
      name: sectionName,
      startDate: startDate?.toISOString() || undefined,
      endDate: endDate?.toISOString() || undefined,
      description: description,
      course: courseId,
    } 
 
    const data = await sectionService.patchSection(sectionToUpdate);
    setIsInEditMode(false);
  }

  const renderButtonEditSave = () => {
    if (isInEditMode) {
      return (
        <span onClick={saveSection} className={styles.saveButton} aria-label='Save section'>
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
          <InputLabel>Change Section Name</InputLabel>
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
          <InputLabel>Change description</InputLabel>
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

  const handleChangeCourse = (e: any) => {
    const newCourseId = e.target.value;
    const newCourse = courses.find(course => course.id === newCourseId);
    const newCourseName = newCourse ? newCourse.courseName : '';
    
    setCourseId(newCourseId);
    setCourseName(newCourseName);
  };

  const renderCourse = () => {
    if (isInEditMode) {
      return (
        <div className={styles.textFieldCourse}>
          <InputLabel>Select Course</InputLabel>
        <Select
          variant="outlined"
          className={styles.select}
          value={courseId}
          onChange={handleChangeCourse}
        >
          <MenuItem disabled>Pick a course</MenuItem>
          {courses.map(course => <MenuItem value={course.id}>{course.courseName}</MenuItem>)}

        </Select>
        </div>
      )
    } else {
      return (
        <span className={styles.course_title}> {courseName}</span>
      )
    }
  }
    
  return (
    <Container className={styles.manageSections} aria-label='Manage Section'>
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>SECTION/{sectionName} </h2>
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
          {renderCourse()}
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
                    onChange={e => setStartDate(e || undefined)}
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
                    onChange={e => setEndDate(e || undefined)}
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