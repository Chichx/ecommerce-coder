export const ItemDetail = ({ item }) => {

    return(
        <>
        <div className="bg-[#2d2d2d] w-96 rounded-xl p-6">
                <div className="flex flex-col justify-center items-center">
                    <img src={item.pictureUrl} alt="" width="175" height="150" />
                </div>
				<h3 className="font-medium text-xl text-white text-center">{item.title}</h3>
				<h2 className="text-gray-200 font-semibold text-3xl mt-2 text-center"><span className="gradient-text">${item.price}</span></h2>
                <div className="w-full h-[1px] bg-gray-500 my-4"></div>
				<p className="font-medium text-base text-zinc-400 text-center mt-2">{item.description}</p>
				<div className="w-full h-[1px] bg-gray-500 my-4"></div>
                {item.category === 'celulares' && (
            <div>
                {Object.entries(item).map(([key, valor]) => {
                    const ignorarPropiedades = ['id', 'title', 'description', 'category', 'price', 'pictureUrl'];
                    if (!ignorarPropiedades.includes(key)) {
                        return (
                            <div key={key} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip text-orange-400 mr-4" width="15" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"></path>
                                </svg>
                                <p className="text-gray-200 font-medium text-base mt-2">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${valor}`}</p>
                            </div>
                    );
                }
                    return null;
                })}
            </div>
            )}

            {item.category === 'fundas' && (
            <div>
                {Object.entries(item).map(([key, valor]) => {
                    const ignorarPropiedades = ['id', 'title', 'description', 'category', 'price', 'pictureUrl'];
                    if (!ignorarPropiedades.includes(key)) {
                        return (
                            <div key={key} className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-paperclip text-orange-400 mr-4" width="15" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"></path>
                                </svg>
                                <p className="text-gray-200 font-medium text-base mt-2">{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${valor}`}</p>
                            </div>
                    );
                }
                    return null;
                })}
            </div>
            )}

                    <button className="bg-[#272727] hover:bg-black/20 transitions-all duration-200 w-full py-2 rounded-xl text-gray-200 font-medium mt-10">Comprar </button>
		</div>

            <div className="relative flex flex-col">
                <h2 className="text-5xl font-semibold text-white">{item.title}</h2>
                <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-12 text-center  w-[500px] fill-orange-400/90  z-[-1]" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path></svg>
                <p className="font-medium text-lg max-w-lg text-zinc-400 mt-10">{item.description}</p>
            </div>
        </>
    )
}
