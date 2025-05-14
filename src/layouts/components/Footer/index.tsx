import DarkModeContainer from '../DarkModeContainer';

const LayoutFooter = () => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <DarkModeContainer className="h-full flex-center border-t border-base-border border-solid">
      <span
        onClick={() =>
          handleLinkClick('https://github.com/sankeyangshu/galaxy-admin-react/blob/main/LICENSE')
        }
        className="cursor-pointer transition-colors duration-300 hover:text-primary"
      >
        Copyright MIT © 2022-PRESENT sankeyangshu
      </span>
    </DarkModeContainer>
  );
};

export default LayoutFooter;
