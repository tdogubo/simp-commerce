import { useMemo } from 'react';
import './App.css';
import Card from './components/Card';
import { Button } from './components/ui/button';
import { useAppContext } from './context/AppContext';

function App() {
  const { products,
    currentPage,
    setCurrentPage,
    maxPage } = useAppContext();

  const nextDisabled = useMemo(() => currentPage === maxPage, [currentPage, maxPage]);
  const prevDisabled = useMemo(() => currentPage === 1, [currentPage]);

  const incrementPage = () => {
    if (maxPage > currentPage && currentPage >= 1) {
      setCurrentPage(currentPage + 1)
    }

  };

  const decrementPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }
  console.log(currentPage, maxPage);



  return (
    <main className="flex flex-col gap-6">
      <nav className="w-full h-14 flex gap-6 justify-end">
        <Button className="font-bold">
          <img src='shopping-bag.svg' alt='shopping bag' />
          <h2>
            Cart(No of items)
          </h2>
        </Button>
      </nav>
      <section className='w-full flex justify-between items-center'>
        <h1>Page: {currentPage}</h1>
        <div className='space-x-6'>
          <Button variant={"outline"} onClick={decrementPage} disabled={prevDisabled}>Prev</Button>
          <Button variant={"outline"} onClick={incrementPage} disabled={nextDisabled}>Next</Button>
        </div>
      </section>
      <section className="grid w-full grid-cols-4 gap-x-52 gap-y-10  place-items-center ">
        {products?.map((product) => (
          <Card key={product.id}
            title={product.title}
            brand={product.brand}
            images={product.images}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </section>
    </main>
  );
}

export default App
