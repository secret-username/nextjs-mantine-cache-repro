'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleCreateProject = () => {
    setIsPending(true);
    
    // Simulate the server action completing
    setTimeout(() => {
      // 1. Close the modal (triggers a 200ms exit animation)
      close();
      
      // 2. IMMEDIATELY navigate away, which interrupts the exit animation
      // and causes the portal/overlay to orphan in the DOM.
      router.push('/project-editor');
    }, 800);
  };

  return (
    <div style={{ padding: '4rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dashboard</h1>
      <p>
        This page represents the dashboard. Click the button below to open the modal,
        then click &quot;Create Project&quot; to trigger the bug.
      </p>
      
      <Button onClick={open}>Open Modal</Button>

      {/* 
        NOTE: The workaround `styles={{ overlay: { display: opened ? 'block' : 'none' } }}` 
        is intentionally omitted here to reproduce the bug.
      */}
      <Modal opened={opened} onClose={close} title="Create New Project" centered>
        <p style={{ marginBottom: '1rem' }}>
          When you click the button below, we will call <code>close()</code> and <code>router.push()</code> simultaneously.
        </p>
        <Button 
          fullWidth 
          loading={isPending} 
          onClick={handleCreateProject}
        >
          Create Project & Navigate
        </Button>
      </Modal>
    </div>
  );
}
