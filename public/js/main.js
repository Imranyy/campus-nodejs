console.log("%cHello, message me on whatsapp...0734720754, Nice knowing you🤣","color:yellow; font-size:18px;")

const socket=io('http://localhost:5000')
 //checking and asking permission
 if(Notification.permission === 'granted'){
    showNotification();
}else if(Notification.permission !== 'denied'){
    Notification.requestPermission().then(permission =>{
        if(permission === "granted"){
            showNotification();
        }
    });
};
//receiving socket notification
function showNotification(){
    socket.on('notice',data=>{
        console.log('push received...')
       //show notification 
       const notification= new Notification(data.title,{
        body:data.body,
        icon:data.icon,
        requireInteraction:true
    });
    notification.onclick=()=>{
        window.location.href="https://chat-with-mee.web.app/"
    }
 })
}