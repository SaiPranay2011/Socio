import Link from "next/link";

import clsx from "clsx";

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ 
  href, 
  icon: Icon, 
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <Link 
      onClick={handleClick} 
      href={href} 
      className={clsx(`
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500
        dark:text-gray-200
        hover:text-black 
        dark:hover:text-white
        hover:bg-gray-300
        dark:hover:bg-gray-500
      `,
        active && 'bg-gray-300 dark:bg-gray-500 text-black dark:text-white',
      )}>
      <Icon className="h-6 w-6" />
    </Link>
   );
}
 
export default MobileItem;