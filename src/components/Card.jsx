function Card({ icon, title, value }) {
    return (
        <div className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center relative overflow-hidden">
            <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-secondary z-0 opacity-60`}></div>
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full z-0 bg-secondary opacity-60`}></div>

            {icon && <div className={`text-primary text-4xl mb-4`}>{icon}</div>}
            <h3 className="text-lg font-semibold text-gray-700 z-10">{title}</h3>
            <p className={`text-2xl z-10 font-bold text-primary`}>{value}</p>
        </div>
    );
}

export default Card;
