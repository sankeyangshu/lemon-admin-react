import ThemeRadius from './theme-radius';
import ThemeSchema from './theme-schema';

function Appearance() {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <ThemeSchema />
      <ThemeRadius />
    </div>
  );
}

export default Appearance;
