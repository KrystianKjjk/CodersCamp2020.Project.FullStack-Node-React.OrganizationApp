// Course (codersCamp2021) składa się z Section(JS, TS, Node, React). 
// Section zawiera w sobie datę jego początku, końca, nazwę. 
// Gdy następuje startDate z Section, to przez mentora tworzony jest Project, 
// który zawiera w sobie nazwę projektu oraz link do Githuba. Jest to wspólne 
// dla wszystkich członków zespołu. Dla każdego użytkownika mentor tworzy Grade, 
// który składa się z ocen za test, zadanie praktyczne oraz projekt dla danego Section.

import {Grade} from './Grade'
interface User {
    email: string,
    password: string,
    name: string,
    surname: string,
    type: UserType,
    grades: Grade[],
    status: UserStatus
}

enum UserType {
    Admin, Mentor, Participant
}

enum UserStatus {
    Active, Deleted, Archived
}