const HandleSubmitPost = async (req, res) => {
    try {
      const data = req.body;
  
      if (data) {
        console.log("Data received from submitted post:", JSON.stringify(data));
      
        // Esempio di accesso alle proprietà dell'oggetto data
        const { id, title, content, date, author, likes } = data;
        console.log("ID:", id);
        console.log("Title:", title);
        console.log("Content:", content);
        console.log("Date:", date);
        console.log("Author:", author);
        console.log("Likes:", likes);
      } else {
        console.log("Data not received");
        res.status(400).json({ error: "Error sending submitted post" });
      }
    } catch (err) {
      console.error("Error handling submit post:", err.message);
      res.status(500).json({ error: "Server error" }); // Invia una risposta di errore generico
    }
  };
  
  export default HandleSubmitPost;