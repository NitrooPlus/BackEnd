import {Rate} from '../controller/rate';

export function validateRate(rate: Rate): Error | null {

    // نمره باید بین 1 تا 5 باشد
    if (rate.rate < 1 || rate.rate > 5) {
        return {
            message: 'نمره باید بین 1 تا 5 باشد',
            field: 'rate'
        };
    }

    return null;
}
