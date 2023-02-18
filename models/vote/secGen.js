const mongoose=require('mongoose')
const secGenSchema=mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true,
        maxLength:300
    },
    voteVyId:{
        type:Number,
        unque:true,
        require:true
    },
    date:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const secGenModel=mongoose.model("secGen",secGenSchema)
module.exports=secGenModel;