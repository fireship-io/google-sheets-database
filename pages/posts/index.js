import { google } from 'googleapis';
import Link from 'next/link';

export async function getServerSideProps({ query }) {

  const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A2:A4',
  });

  const posts = response.data.values.flat();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}

export default function Post({ posts }) {
  return (
    <article>
      <h1>Posts</h1>
      <ul>
        {posts.map((v, i) => (
          <li key={v}>
            <Link href={`posts/${i + 2}`}>
              <a>{v}</a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
