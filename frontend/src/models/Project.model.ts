export interface ProjectData {
    _id: string;
    sectionId: string;
    projectName: string;
    projectUrl: string;
    description: string;
}

export interface Project {
    id: string;
    name: string;
    sectionName?: string;
    url: string;
    description: string;
};
