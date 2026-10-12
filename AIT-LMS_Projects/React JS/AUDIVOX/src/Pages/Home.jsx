import React from 'react'
import Carousel from "../Components/Carousel"
import Featuredproducts from "../Components/Featuredproducts"
import Topproduct from "../Components/Topproduct"
import Ouradvantages from "../Components/Ouradvantages"

function Home() {
  return (<>
    <Carousel />
    <Featuredproducts />
    <Topproduct />
    <Ouradvantages />
  </>
  )
}

export default Home