const webpush=require('web-push');
const Chat=require('../../models/chat/chat');
const User=require('../../models/userModel');

const io=require('../../index')
require('dotenv').config();

//VAPID KEYS
const publicVapidKey=process.env.PUBLICVAPIDKEY;
const privateVapidKey=process.env.PRIVATEVAPIDKEY;

//webpush
webpush.setVapidDetails('mailto:imranmat254@gmail.com',publicVapidKey,privateVapidKey);

//post chat
// const postChat=async(req,res)=>{    
//     try{
//         const {email}=req.params
//         const user=await User.findOne({email})
//         if(user){
//             const {subscription,message,date,time}=req.body
//             const addChat= await Chat.create({
//                 firstName:user.firstName,
//                 lastName:user.lastName,
//                 message,
//                 photo:user.photo,
//                 email,
//                 date,
//                 time
//             })
//             //create payload
//             const payload=JSON.stringify({
//                 title:`New Message from ${firstName} ${lastName}`,
//                 body:message,
//                 icon:user.photo
//             });
//             //pass object into sendNotification
//             webpush.sendNotification(subscription,payload).catch(error=>{
//                 res.status(500).send({error:error.message})
//             })

//             res.status(200).send({msg:addChat});
//             if(!addChat){
//                 res.status(201).send({error:`Try again!`});
//             }
//         }else{
//             res.status(404).send({error:`User not found!`});
//         }
//     }catch(error){
//         res.status(500).send({error:error.message})
//     }
// }

//chat socket
io.on('connection',(socket)=>{
    //getting the chats from db
    Chat.find().then(res=>{
        socket.emit('output',res)
    })
    console.log(`socket connection made: ${socket.id}`);
 
    socket.on('chat',async(data)=>{
        //posting chats on db
        const {email,date,message,time}=data;
        const user=await User.findOne({email})
        const msg=new Chat({ 
            firstName:user.firstName,
            lastName:user.lastName,
            message,
            photo:user.photo,
            email,
            date,
            time
        })
        msg.save().then(()=>{
            //emitting chats to sockets
           io.emit('chat',msg)
           io.broadcast.emit('notice',{
                title:`New Message from ${msg.firstName} ${msg.lastName}`,
                body:`${msg.message.slice(0,50)}\n${msg.time}`,
                icon:msg.photo
            })
        })
    })
})

// module.exports={
//     postChat
// }