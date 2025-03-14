import { useEffect, useMemo } from 'react';
import './App.css';
import Card from './components/Card.tsx';
import Cart from './components/Cart.tsx';
import { Button } from './components/ui/button.tsx';
import { useAppContext } from './context/AppContext.tsx';
import { Toaster } from 'sonner';

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
  };

  useEffect(() => window.scrollTo(0, 0), [currentPage]);

  return (
    <main className="flex flex-col gap-6">
      <Toaster position="top-right" richColors />
      <nav className="w-full md:mb-10 mb-5 -mt-3.5 flex gap-6 justify-end">
        <Cart />
      </nav>
      <section className='w-full flex justify-between items-center'>
        <h1>Page: {currentPage}</h1>
        <div className='space-x-6'>
          <Button variant={"outline"} onClick={decrementPage} disabled={prevDisabled}>Prev</Button>
          <Button variant={"outline"} onClick={incrementPage} disabled={nextDisabled}>Next</Button>
        </div>
      </section>
      <section className="grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-x-52 gap-x-20 gap-y-10  place-items-center px-5 ">
        {products?.map((product) => (
          <Card key={product.id} product={product}
          />
        ))}
      </section>
      <section className='w-full flex justify-between items-center'>
        <h1>Page: {currentPage}</h1>
        <div className='space-x-6'>
          <Button variant={"outline"} onClick={decrementPage} disabled={prevDisabled}>Prev</Button>
          <Button variant={"outline"} onClick={incrementPage} disabled={nextDisabled}>Next</Button>
        </div>
      </section>
    </main>
  );
}

export default App
