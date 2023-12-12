const thirtyOneDaysMonth = ['1', '3', '5', '7', '8', '10', '12'];
const thirtyDaysMonth = ['2', '4', '6', '9', '11'];

export const useDays = () => {

    const getDate = new Date();

    const formatDate = (plus) => {
        let day = `${getDate.getDate() + plus}`
        let month = `${getDate.getMonth() + 1}`
        let year = `${getDate.getFullYear()}`

        if (day.length === 1) {
            day = 0 + day
        }

        if (month.length === 1) {
            month = 0 + month
        }

        const fullDate = `${year}-${month}-${day}`

        return fullDate
    };

    const dayPlusSeven = (plus) => {

        let day = `${Number(getDate.getDate()) + plus}`;
        let month = `${getDate.getMonth() + 1}`;
        let year = `${getDate.getFullYear()}`;

        if (day >= 30 && thirtyDaysMonth.includes(month)) {

            const extraDays = day - 30;
            day = `0${extraDays}`
            month = `${Number(month) + 1}`

        } else if (day >= 31 && thirtyOneDaysMonth.includes(month)) {

            const extraDays = day - 31;
            day = `0${extraDays}`
            month = `${Number(month) + 1}`

            if (month > 12) {
                month = '01';
                const sumYear = Number(year) + 1;
                year = `${sumYear}`
            }

        }

        if (day.length === 1) {
            day = 0 + day;
        };

        if (month.length === 1) {
            month = 0 + month;
        };

        const fullDate = `${year}-${month}-${day}`;

        return fullDate;
    }

    return { formatDate, dayPlusSeven }
}

