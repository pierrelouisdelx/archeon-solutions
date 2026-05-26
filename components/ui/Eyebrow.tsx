import { cn } from '@/lib/utils';

type EyebrowProps = {
  index?: string;
  label: string;
  className?: string;
};

export default function Eyebrow({ index, label, className }: EyebrowProps) {
  return (
    <span className={cn('eyebrow inline-flex items-center gap-3', className)}>
      {index ? (
        <>
          <span aria-hidden className="text-bone-dim">{index}</span>
          <span aria-hidden className="inline-block w-6 h-px bg-signal/60" />
        </>
      ) : null}
      <span>{label}</span>
    </span>
  );
}
