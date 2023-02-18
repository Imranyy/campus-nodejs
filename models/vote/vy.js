const mongoose=require('mongoose')
const vySchema=mongoose.Schema({
    vyid:{
        type:Number,
        unique:true
    },
    firstName:{
        type:String,
        require:true,
        maxLength:300
    },
    lastName:{
        type:String,
        require:true,
        maxLength:300
    },
    image:{
        type:String,
        require:true
    },
    vyingPost:{
        type:String,
        require:true
    },
    manifesto:{
        type:String,
        require:true
    },
    votes:{
        type:Number,
    },
    payment:{
        type:Number,
        require:true
    },
    date:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

const vyModel=mongoose.model("vy",vySchema)
module.exports=vyModel;