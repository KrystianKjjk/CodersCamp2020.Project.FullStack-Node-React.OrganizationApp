//Wspolne dla wszystkich uczestnikow i mentorow

import {Section} from './Section'
export interface Course {
    id: number,
    name: string,
    sections: Section[],
    description?:string
}