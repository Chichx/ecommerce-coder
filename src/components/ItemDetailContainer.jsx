import { useParams } from "react-router-dom";
import { productos } from "../data/data";
import {useEffect, useState} from "react";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
	const [item, setItem] = useState(null)

	const { id } = useParams();

	console.log(id)

	useEffect(() => {
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(productos);
			}, 2000)
		});

		promise.then((res) => {
			const findPorId = res.find(item => item.id == Number(id));
			setItem(findPorId)
		})
	}, [id]);

return (
    <>
    <div className="absolute top-0 right-0 w-48 h-48 blur-[180px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 blur-[250px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
    <div  className="relative flex items-center justify-center h-screen gap-64">
	{item ? <ItemDetail item={item} /> :
	<div className="flex flex-row gap-2">
		<div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce"></div>
		<div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:-.3s]"></div>
		<div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:-.5s]"></div>
	</div>
		}

    </div>
    </>
)
}
