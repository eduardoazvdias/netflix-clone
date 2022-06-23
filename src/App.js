import React, { useEffect, useState } from 'react'
import Tmdb from './components/Tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import "./App.css";
import Header from './components/Header';

const App = () => {

  const [movieList,setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( () => {
    const loadAll = async () => {
      //pega lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pega destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomFeat = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let Featured = originals[0].items.results[randomFeat];
      let FeaturedInfo = await Tmdb.getMovieInfo(Featured.id, 'tv');
      setFeaturedData(FeaturedInfo);
      
    }

    loadAll();
  }, []);


  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
    window.removeEventListener('scroll', scrollListener);

    }
  }, []);

  return (
    <div className='page'>

      <Header black={blackHeader}/>
      
      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className='lists'>
        {movieList.map( (item,key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      {movieList.length <= 0 &&
      <div className='loading'>
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando..." />
      </div>
      }
    </div>
  );
}

export default App;