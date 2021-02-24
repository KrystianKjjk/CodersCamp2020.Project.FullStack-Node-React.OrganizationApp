import { now } from 'mongoose';
import {Course} from '../Models/Course'; 
import {Section} from '../Models/Section';
export default class CourseService {


    getCourses = async() => {

const HTMLSection:Section={
    id:1,
    name:'HTML i CSS Section',
    startDate: new Date(),
    endDate:new Date()
}

const JavaScriptSection:Section={
    id:2,
    name:'JavaScript',
    startDate:new Date(),
    endDate:new Date()
}

const course1:Course={id:1,
name:'CodersCamp 2020',
sections:[HTMLSection, JavaScriptSection]
};

const course2:Course={
    id:2,
    name:'CodersCamp 2021',
    sections:[HTMLSection]
}

let courses=[course1, course2];
return courses;
}

getCourseById=async(c) => {

    const HTMLSection:Section={
        id:1,
        name:'HTML i CSS Section',
        startDate: new Date(),
        endDate:new Date()
    }
    
    const JavaScriptSection:Section={
        id:2,
        name:'JavaScript',
        startDate:new Date(),
        endDate:new Date()
    }
    
    const course1:Course={id:1,
    name:'CodersCamp 2020',
    sections:[HTMLSection, JavaScriptSection]
    };
    
    const course2:Course={
        id:2,
        name:'CodersCamp 2021',
        sections:[HTMLSection]
    }
    
    let courses=[course1, course2];
    const foundCourse=courses.find(course=>course.id===parseInt(c))
    return foundCourse;
    }

createCourse=async(course)=>{
    const HTMLSection:Section={
        id:1,
        name:'HTML i CSS Section',
        startDate: new Date(),
        endDate:new Date()
    }
    
    const JavaScriptSection:Section={
        id:2,
        name:'JavaScript',
        startDate:new Date(),
        endDate:new Date()
    }
    
    const course1:Course={id:1,
    name:'CodersCamp 2020',
    sections:[HTMLSection, JavaScriptSection]
    };
    
    const course2:Course={
        id:2,
        name:'CodersCamp 2021',
        sections:[HTMLSection]
    }
    
    let courses=[course1, course2];
    
    courses.push(course);
    console.log(courses);
    return courses;
}


}


// const course2:Course={
//     id:2,
//     name:'CodersCamp 2021',
//     sections:[{
//         id:1,
//         name:'HTML i CSS Section',
//         startDate: new Date(),
//         endDate:new Date()
//     }]
// }

