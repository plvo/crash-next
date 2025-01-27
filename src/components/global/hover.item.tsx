import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function HoverItem({
  trigger,
  content,
}: {
  trigger: string | JSX.Element;
  content: string | JSX.Element;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">{trigger}</HoverCardTrigger>
      <HoverCardContent className="text-sm w-full">{content}</HoverCardContent>
    </HoverCard>
  );
}
