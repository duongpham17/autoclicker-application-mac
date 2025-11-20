export interface Validation {
    name?: string 
}

export const validation = (values: Validation) => {
    let errors: Validation = {};

    const check = (key: any) => key in values;

    if(check("name")){
        if(!values.name) {
            errors.name = "required";
        }else if(values.name.length <= 1 ) {
            errors.name = " 1 >";
        } else if(values.name.length >= 20){
            errors.name = " < 20"
        }
    };

    return errors
}

export default validation