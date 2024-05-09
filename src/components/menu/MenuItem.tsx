interface MenuItemProps {
    text: string;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, onClick }) => {
    return ( 
        <li className="">
            <span className="text-white hover:text-primary text-[15px] font-medium hover:cursor-pointer" onClick={onClick}>{text}</span>
        </li>
    );
}

export default MenuItem;