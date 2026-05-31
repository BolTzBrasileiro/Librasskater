import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, email, mensagem } = req.body;

    try {
        await resend.emails.send({
            from: 'Site Libras Skate <onboarding@resend.dev>',
            to: 'oiginho234@gmail.com', // ← troque aqui
            subject: `Novo contato: ${nome}`,
            html: `
                <h3>Novo contato pelo site!</h3>
                <p><b>Nome:</b> ${nome}</p>
                <p><b>E-mail:</b> ${email}</p>
                <p><b>Mensagem:</b> ${mensagem}</p>
            `
        });

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar e-mail' });
    }
}