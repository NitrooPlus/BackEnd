import {CustomerProfile} from '../controller/customer_profile';

export function validateCustomerProfile(customerProfile: CustomerProfile): Error | null {

    // نام باید حداقل 3 کاراکتر باشد
    if (customerProfile.name.length < 3) {
        return {
            message: 'نام باید حداقل 3 کاراکتر باشد',
            field: 'name'
        };
    }

    // ایمیل باید یک آدرس ایمیل معتبر باشد
    if (!customerProfile.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return {
            message: 'ایمیل باید یک آدرس ایمیل معتبر باشد',
            field: 'email'
        };
    }

    // شماره تلفن باید حداقل 10 کاراکتر باشد
    if (customerProfile.phone.length < 10) {
        return {
            message: 'شماره تلفن باید حداقل 10 کاراکتر باشد',
            field: 'phone'
        };
    }

    return null;
}
