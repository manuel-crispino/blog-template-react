
 export default async function dataUser  (req,res){
    const data = req.body; 
    try{
    console.log(data);
    res.send(JSON.stringify("data received"));}
    catch(err){
        console.log(err.message);
    };
  };

