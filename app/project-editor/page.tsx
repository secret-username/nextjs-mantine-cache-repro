import Link from 'next/link';
import { Button } from '@mantine/core';

export default function ProjectEditorPage() {
  return (
    <div style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Project Editor</h1>
      <p>
        The modal was closed and Next.js navigated you here before Mantine&apos;s exit animation could finish.
      </p>
      
      <p>
        <strong>How to see the bug:</strong> Click the link below to go back to the dashboard. You will notice that you cannot click the &quot;Open Modal&quot; button anymore because an invisible <code>&lt;div class=&quot;mantine-Modal-overlay&quot;&gt;</code> was left behind in the DOM.
      </p>
      <Link href="/" prefetch>
        <Button variant="outline">
          Go back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
