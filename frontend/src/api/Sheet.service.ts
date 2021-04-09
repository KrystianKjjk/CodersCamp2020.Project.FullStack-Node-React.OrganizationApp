import BaseService from '../app/baseService';
import { GradeSheetData } from '../models';


export default class SheetService {

    constructor(private api = new BaseService()) { }

    async getMentorSheets(mentorId?: string): Promise<GradeSheetData[] | null> {
        let gradeSheetsRes;
        console.log({mentorId});
        try {
            gradeSheetsRes = await this.api.get(`/mentors/${mentorId}/grade/sheets`);
        } catch(err) {
            return null;
        }
        console.log(gradeSheetsRes);
        return gradeSheetsRes.data as GradeSheetData[];
    }

}
