import mongoose, { Schema } from "mongoose";

const users = new Schema({
    name : {
        type : String , 
        require : true
    },
    password : {
        type : String ,
        require : true
    },
    birthDay : {
        type : String ,
        require : true
    },
    education : {
        type : String ,
        require : true
    },
    nationality : {
        type : String ,
        require : true
    },
    placeOfBirth : {
        type : String ,
        require : true
    },
    workExprience : [{
        skills : {
            type : String ,
            require : true
        },
        projects : {
            type : String ,
            require : true
        },
        workProgress : [{
            company : {
                type : String ,
                require : true
            },
            role : {
                type : String ,
                require : true
            },
            startDate : {
                type : Date ,
                require : true
            },
            endDate : {
                type : Date ,
                require : true
            }
        }]
    }],
    hobby : {
        type : String ,
        require : true
    },
    target : {
        type : String ,
        require : true
    }
})

export default mongoose.model("users" , users)