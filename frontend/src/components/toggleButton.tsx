interface ToggleButtonProps {
  children_on: string;
  children_off: string;
  isToggled: boolean;
  onToggle: (isToggled: boolean) => void;
}

export function ToggleButton({
  children_on,
  children_off,
  isToggled,
  onToggle,
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      className={`w-48 py-2 px-4 rounded-lg ${isToggled ? 'bg-green-500' : 'bg-red-500'}`}
      onClick={() => onToggle(!isToggled)}
    >
      {isToggled ? children_on : children_off}
    </button>
  );
}
