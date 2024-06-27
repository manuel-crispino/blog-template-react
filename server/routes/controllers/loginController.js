const handleLogin = async (req, res) => {
    const { email, password, csrfToken } = req.body; // Non è necessario usare await qui

    try {
       

        const user = await checkUserCredentials(email, password);

        if (user.exists) {
            res.json({
                id:user.id,
                role: user.role, // Invia il ruolo dell'utente nella risposta
                email: email,
                success: true,
                message: "You have successfully logged in."
            });
            console.log("email:", email);
            console.log("Password:", password);
            console.log("token:", csrfToken);
            console.log("user-role:",user.role)
        } else {
            res.json({
                success: false,
                message: "email or password incorrect."
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

async function checkUserCredentials(email, password) {
    const user = email === 'email@gmail.com' && password === 'password';
    const admin = email === 'admin@gmail.com' && password === 'password';

    if (user) {
        return { id:1, role: 'user', exists: true }; // Ritorna un oggetto con il ruolo dell'utente e indica che l'utente esiste
    } else if (admin) {
        return { id:2, role: 'admin', exists: true }; // Ritorna un oggetto con il ruolo admin e indica che l'utente esiste
    } else {
        return { exists: false }; // Se l'utente non è trovato, ritorna che non esiste
    }
}

export { handleLogin};