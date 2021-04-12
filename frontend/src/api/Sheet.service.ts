import BaseService from '../app/baseService';
import { GradeSheetData } from '../models';


export default class SheetService {

    constructor(private api = new BaseService()) { }

    async getMentorSheets(mentorId?: string): Promise<GradeSheetData[] | null> {
        let gradeSheetsRes;
        try {
            gradeSheetsRes = await this.api.get(`/mentors/${mentorId}/grade/sheets`);
        } catch(err) {
            return null;
        }
        return gradeSheetsRes.data as GradeSheetData[];
    }

}
