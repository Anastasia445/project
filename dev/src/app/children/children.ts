export interface children {
    id: number;
    photo: string;
    lastName: string;
    firstName: string;
    patronymic: string;

    groups:[number];
    parents:[{
        firstName:string;
        lastName:string;
        patronymic:string;
    }]
    comment:string;
    causes:[
    {
        date:string;
        cause:string;
        causeBol:boolean;
    }],
 

    dayOfBirth: string;
    weightF: string;
    heightF: string;
    weightS: string;
    heightS: string;
    groupOfHealth: string;
    diet: string;
    cityR: string;
    streetR: string;
    houseR: string;
    flatR: string;
    telephoneR: string;
    cityL: string;
    streetL: string;
    houseL: string;
    flatL: string;
    telephoneL: string;
    whoIs: string;
    firstNameW: string;
    lastNameW: string;
    patronymicW: string;
}