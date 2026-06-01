import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);  /* CÓDIGO DESTE API ESTÁ LOCALIZADO EM VERCEL, ADMINISTRADO POR OIGOR6162@GMAIL.COM */

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, email, mensagem } = req.body;

    try {
        await resend.emails.send({
            from: 'Site Libras Skate <onboarding@resend.dev>', /* Este campo a ser atualizado futuramente, em caso da oficialização do domínio */
            to: 'librasskater@gmail.com', // ← troque aqui se quiser trocar de receptor, normalmente o original é "librasskater@gmail.com"
            cc: 'oiginho234@gmail.com',
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