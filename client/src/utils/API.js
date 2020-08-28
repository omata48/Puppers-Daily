import axios from 'axios';

export default {
    // This function is to check if the user is logged in, and to return their info if they are not
    checkUserInfo: () => {
        return axios.get("/api/user_data");
    },
    signup: (signupData) => {
        return axios.post("/api/signup", signupData);
    },
    login: (loginData) => {
        return axios.post("/api/login", loginData);
    },
    logout: () => {
        return axios.get("/logout");
    },
    addPet: (petData) => {
        return axios.post("/api/pet", petData);
    },
    removePet: (petId) => {
        return axios.delete("/api/delete/"+petId);
    },
    updatePet: (petId, petData) => {
        return axios.put('/api/update/'+petId, petData)
    },
    getPets: () => {
        return axios.get("/api/pet_data");
    },
    getBreeds:(query) => {
        return axios.get('/api/searchBreed/'+query)
    }
}