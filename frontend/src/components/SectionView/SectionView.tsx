import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns'; 
import 'date-fns'
//
import { Container, CssBaseline, Paper, InputLabel, MenuItem, Select } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
//
import styles from './SectionView.module.css';
import SectionService from '../../api/ManageSection.service';
import { NewSectionData } from '../../models/Section.model';
import { CourseForSection } from '../../models/Course.model';
import StyledTextField from '../StyledTextField';
import UButton from "../UButton";
import ConfirmationDialog from '../ConfirmationDialog';

const SectionView = () => {
  const sectionService = useMemo(() => new SectionService(), []);
  const [sectionName, setSectionName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [referenceProject, setReferenceProject] = useState("");
  const [courses, setCourses] = useState<CourseForSection[]>([]);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const { id } = useParams<Record<'id', string>>()
  const history = useHistory();
  const [isOpen, setIsOpen]=useState(false);

  
  useEffect(() => {
    const getCourseData = async () => {
      const data = await sectionService.getCourses();
      setCourses(data);
    };
  
    const getProjectData = async () => {
      const project = await sectionService.getProjectForSection(id);
      setReferenceProject(project.projectName);
    };

    const getOneSectionData = async () => {
      const data = await sectionService.getOneSection(id);
  
      setSectionName(data.name);
      setCourseName(data.courseName);
      setCourseId(data.courseId);
      setDescription(data.description || '');
      setStartDate(data.startDate ? new Date(data.startDate * 1000) : undefined);
      setEndDate(data.endDate ? new Date(data.endDate * 1000) : undefined);
    };

    if (id) getOneSectionData();
    else setIsInEditMode(true);
    getCourseData();
    getProjectData();
  }, [sectionService, id]);

  const saveSection = async () => {
    const sectionData: NewSectionData = {
      name: sectionName,
      startDate: startDate?.toISOString() || undefined,
      endDate: endDate?.toISOString() || undefined,
      description: description,
      course: courseId,
    } 
    
    id ? await sectionService.patchSection(id, sectionData) : await sectionService.addSection(sectionData);
    setIsInEditMode(false);
  }

  const handleDeleteClick = async () => {
    await sectionService.deleteSection(id);
    history.push('/sections');
  }

  const handleOpenDeleteConfirmation = () => {
    setIsOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setIsOpen(false);
  };

  const renderButtonEditSave = () => {
    return isInEditMode 
    ? (
      <span onClick={saveSection} className={styles.saveButton} aria-label='Save section'>
        <UButton text='SAVE' color='primary' onClick={() => setIsInEditMode(true)}/>
      </span>) 
    : (
      <span className={styles.editButton} aria-label='Edit section'>
        <UButton text='EDIT' color='primary' onClick={() => setIsInEditMode(true)}/>
      </span>
      )
  }

  const renderSectionName = () => {
    return isInEditMode 
    ? (
      <div className={styles.textFieldSectionName}>
        <InputLabel>Section Name</InputLabel>
        <StyledTextField
          value={sectionName}
          onChange={e => setSectionName(e.target.value)}
        />
      </div>) 
    : (
          <span className={styles.section_title}> {sectionName} </span>
      )
  }

  const renderDescription = () => {
    return isInEditMode 
    ? (
      <div className={styles.textFieldDescription}>
        <InputLabel>Description</InputLabel>
        <StyledTextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline={true}
        />
      </div>) 
    : (
        <span> Description: {description} </span>
      )
  }

  const handleChangeCourse = (e: any) => {
    const newCourseId = e.target.value;
    const newCourse = courses.find(course => course.id === newCourseId);
    const newCourseName = newCourse ? newCourse.courseName : '';
    
    setCourseId(newCourseId);
    setCourseName(newCourseName);
  };

  const renderCourse = () => {
    return isInEditMode 
    ? (
      <div className={styles.textFieldCourse}>
        <InputLabel>Select Course</InputLabel>
        <Select
          variant="outlined"
          className={styles.select}
          value={courseId}
          onChange={handleChangeCourse}
        >
          <MenuItem disabled>Pick a course</MenuItem>
          {courses.map(course => <MenuItem value={course.id} key={course.id}>{course.courseName}</MenuItem>)}
        </Select>
      </div>) 
    : (
        <span className={styles.course_title}> {courseName}</span>
      )
  };

  const renderButtonDelete = () => {
    return id 
    ? (
      <div><UButton text='DELETE' color='secondary' onClick={handleOpenDeleteConfirmation}/></div>) 
    : (
      null
      )
  }
    
  return (
    <Container className={styles.manageSections} aria-label='Manage Section'>
      <ConfirmationDialog
            title="Are you sure you want to delete this section?"
            content="This action is irreversible."
            isOpen={isOpen}
            onClose={handleCloseDeleteConfirmation }
            handleConfirm={handleDeleteClick}
            handleCancel={handleCloseDeleteConfirmation}
        />
      <CssBaseline />
      <Paper className={styles.mainHeader}>
        <h2>SECTION/{sectionName} </h2>
      </Paper>
      <Paper className={styles.container}>
        <div className={styles.manageContainer}>
          <h2 className={styles.manageHeader}>Manage Section</h2>
          <div className={styles.buttonContainer}>
            <span className={styles.deleteButton} aria-label='Delete section'>
              {renderButtonDelete()}
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