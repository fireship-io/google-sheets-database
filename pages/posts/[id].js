import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    // Auth
    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    // Query

    const { id } = query;
    const range = `Sheet1!A${id}:C${id}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    // Result

    const [title, content] = response.data.values[0];
    console.log(title, content)

    return { 
        props: {
            title,
            content
        } 
    }
}

export default function Post({ title, content }) {
    return <article>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </article>
}