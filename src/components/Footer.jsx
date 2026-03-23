import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center">
        

        {/* Right side (Language Switcher) */}
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
        </div>

      </div>
    </footer>
  );
}