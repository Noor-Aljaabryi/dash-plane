function Button({ title, Icon , color ,className = "" }) {
    return (
        <button className={`flex items-center gap-1 ${color} px-4 py-2 rounded-lg text-sm hover:opacity-90 transition whitespace-nowrap ${className}`}>
            <Icon size={16} />
            <span>{title}</span>
        </button>
    );
}

export default Button;