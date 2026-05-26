import { cn } from '@/lib/utils';
import Eyebrow from './Eyebrow';

type SectionHeaderProps = {
  index?: string;
  label: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeader({
  index,
  label,
  title,
  body,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <Eyebrow index={index} label={label} className="mb-6" />
      <h2 className="h-section text-bone">{title}</h2>
      {body ? (
        <p className="mt-5 text-base md:text-lg text-bone-dim leading-relaxed max-w-2xl">
          {body}
        </p>
      ) : null}
    </header>
  );
}
