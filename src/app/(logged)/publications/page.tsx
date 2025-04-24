import ListPublications from '@/components/publications/list-publications';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications',
};

export default function Page() {
  return (
    <section>
      <h1>Publications</h1>
      <ListPublications />
    </section>
  );
}
