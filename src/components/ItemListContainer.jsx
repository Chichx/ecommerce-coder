import { ItemList } from "./ItemList";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where} from "firebase/firestore";

export const ItemListContainer = (props) => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const refCollection = !id ? collection(db, "items") : query(collection(db, "items"),where("category", "==", id));

    getDocs(refCollection).then((snapshot) => {
      if (snapshot.size === 0) console.log("no results");
      else
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
    });
  }, [id]);

  return (
    <>
      <div className="mt-24 relative">
        <div className="absolute top-96 right-0 w-48 h-48 blur-[180px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 blur-[200px] bg-gradient-to-r from-orange-300 to-orange-500 rounded-3xl z-[-1]"></div>
        <div className="relative flex flex-col justify-center">
          <h2 className="text-center text-white font-medium text-5xl">
            Todos nuestros productos!
          </h2>
          <div className="flex justify-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute top-12 text-center  w-96 fill-orange-400/90 rotate-180 z-[-1]"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
          </div>
          <div className="w-full flex justify-center items-center text-center">
            <p className="text-base text-center max-w-full mx-4 xl:mx-0 xl:max-w-lg mt-8 font-medium text-zinc-500">
              Acá encontraras todos nuestros productos certificados
            </p>
          </div>
        </div>

        {items && items.length > 0 ? (
          <div className="my-12 flex justify-center items-center">
            <div className="flex  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
              <ItemList items={items} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-64 gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-orange-400 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        )}
      </div>
    </>
  );
};
