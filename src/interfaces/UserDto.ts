export interface userDto{
    fullname : string,
    name : string,
   username:string,
   email:string,
   phone:string,
   addressDto :{
       street: string,
       streetNumber: string,
       municipalityId: string
   }

}