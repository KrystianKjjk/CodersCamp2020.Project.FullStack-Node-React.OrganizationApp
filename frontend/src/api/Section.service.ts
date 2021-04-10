import { AxiosResponse } from 'axios';
import BaseService from '../app/baseService';
import { Section, SectionData } from '../models';


export default class SectionService {
    
    constructor(private api = new BaseService()) { }

    async getSection(id: string): Promise<Section | null> {
        let sectionRes: AxiosResponse<SectionData>;
        let section: SectionData;
        try {
            sectionRes = await this.api.get(`/sections/${id}`);
            section = sectionRes.data;
            console.log(section);
        } catch(err) {
            return null;
        }
        return {
            id: section._id,
            name: section.name,
        };
    }

}
