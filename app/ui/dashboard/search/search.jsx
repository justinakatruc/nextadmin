"use client";
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Search = ({placeholder}) => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();  
  const pathname = usePathname();
  
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const input = e.target.querySelector('input');
    if (input.value) {
      params.set("q", input.value);
    }
    else {
      params.delete("q");
    }
    
    replace(`${pathname}?${params}`);
  }

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <button type="submit" className={styles.button}><MdSearch /></button>
      <input type="text" placeholder={placeholder} className={styles.input}/>
    </form>
  );
};

export default Search;