// UserProfile.js
const Food = (function () {

    const getMealFed = function (date) {
        var foodData = JSON.parse(localStorage.getItem(date));
        if (foodData){
            return foodData;
        } else {
            return [];
        }
    };

    const setMealFed = function (date,newFood) {
        localStorage.setItem(date, JSON.stringify(newFood));
    };

    const deleteMealFed = function(date,newFood) {
        localStorage.setItem(date, JSON.stringify(newFood));
    }

    return {
        getMealFed: getMealFed,
        setMealFed: setMealFed,
        deleteMealFed: deleteMealFed
    }
})();

export default Food;