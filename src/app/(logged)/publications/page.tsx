import { Metadata } from 'next';
import ListPublications from '@/components/publications/list-publications';

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
