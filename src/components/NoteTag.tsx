interface NoteTagProps {
  label: string;
  className?: string;
}

export default function NoteTag({ label, className = "" }: NoteTagProps) {
  return (
    <span className={`note-tag ${className}`}>{label}</span>
  );
}
