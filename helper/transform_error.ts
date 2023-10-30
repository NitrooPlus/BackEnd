//Transform Error of Class-Vlidator

export interface errListType{
    property:string,
    constraints?:{
        [key:string]:string
    }
    [key:string]:any
}
export default function transform_error(errList:errListType[] ){
    const errObject:{
        [key:string]:string
    }={
    }
    errList.forEach(e=>{
        if(e.constraints && e.property)
        errObject[e.property]=Object.values(e.constraints)[0]
    })
    return errObject
}