import React, { useState, useContext, useEffect } from 'react';
import SingleProduct from './SingleProduct/SingleProduct';
import {loadItemsAction, MenuContext, loadItems} from '../../StoreLogic/store';

const menu = [{
      item_name: 'Kuki-Hojicha',
      description: 'Sourced from a family farm in Japan. This roasted green tea has notes of nuts, sesame, and a hint of caramel.',
      item_category: 'popular',
      price: 4.50,
      image_id: '001',
      available_in_temp: 'both',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      item_name: 'Kyoho Grape Oolong',
      description: 'This Kyoho Grape Oolong has a wonderful aroma of ripe juicy grapes balanced with the delicate flavors of high mountain Taiwanese oolong.',
      item_category: 'popular',
      price: 4.00,
      image_id: '002',
      available_in_temp: 'both',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      item_name: 'Golden Pomelo Oolong',
      description: 'A highly aromatic cup with the aroma of succulent golden pomelo. The infusion is smooth and velvety, with delectable citrus notes.',
      item_category: 'popular',
      price: 5.00,
      image_id: '003',
      available_in_temp: 'both',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
export default function FullMenu(){
  // const {store} = useContext(MenuContext)
  // local state:
  const [items, setItems] = useState([{item_name:"jo"}])

    useEffect(() => {
    (async () => {
      const {data} = await loadItems();
      console.log(data.items)
      setItems(data.items)
    })()
  }, [])


  // local states:
  const [displayMenu, setDisplayMenu] = useState()

  function handleClick(e){
    console.log(e);    
    setDisplayMenu(()=>e)
  }

  const ComponentToRender = () => {
    if (displayMenu != null){
      return <SingleProduct itemInfo={displayMenu}/>
    }
    else{
      return( 
        <>
            <ul>
    {items.map(entry=>{
      return <li key={entry.itemName} onClick={()=>{handleClick(entry)}}>
        {entry.itemName}
      </li>
    })}
    </ul> 
        </>
    )
    }

  }

  return (

    <ComponentToRender />
  )
}