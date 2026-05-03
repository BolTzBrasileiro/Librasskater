var express = require('express');
var nodemailer = require('nodemailer'); 

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('..'));

app.post('/enviar-email', async (req, res) => {
    const { nome, email, mensagem } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'SEU-EMAIL', 
                pass: '<SENHA_APP>'
            }
        });

        let info = await transporter.sendMail({
            from: `"Site Libras Skate" <SEU-EMAILc>`, 
            to: 'SEU-EMAIL',
            subject: `Novo Contato do site: ${nome}`,
            text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`, 
            html: `<h3>Novo contato pelo site!</h3>
                   <p><b>Nome:</b> ${nome}</p>
                   <p><b>E-mail:</b> ${email}</p>
                   <p><b>Mensagem:</b> ${mensagem}</p>`
        });

        // Removido o window.location.href daqui!
        console.log("E-mail enviado com sucesso: " + info.messageId);
        
        // Devolvemos o OK para o Front-end
        res.status(200).send("E-mail enviado com sucesso!");

    } catch (error) {
        console.error("Erro ao enviar o e-mail: ", error);
        res.status(500).send("Ocorreu um erro ao enviar a mensagem.");
    }
});

app.listen(80, () => {
    console.log('Servidor rodando na porta 80!');
});