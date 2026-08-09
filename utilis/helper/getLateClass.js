
/******* Utility function to get the appropriate class for late percentage ****/

const getLateClass = (latePercentage) => {


    // Check if the percentage is a number and above a certain threshold for the red background
    const numericPercentage = parseInt(latePercentage, 10);
    if (!isNaN(numericPercentage) && numericPercentage > 10) {
        return 'bg-red-200 dark:bg-red-800 dark:text-red-100';
    }
    return '';
};



export default getLateClass;