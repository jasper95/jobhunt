import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Link from 'next/link';

import 'sass/components/footer/index.scss'


export default function Footer(){

  const sample_menu = [
    {
      name: 'lorem menu',
      link: '/lorem'
    },
    {
      name: 'ipsum menu',
      link: '/ipsum'
    },
    {
      name: 'dolor menu',
      link: '/dolor'
    },
    {
      name: 'amet menu',
      link: '/amet'
    }
  ]


  const renderMenu = () => {
    return sample_menu.map(({name, link}) => {
      return (
        <li key={link} className='footer_colItem_menu_item'>
          <Link href={link}>
            <a>
              {name}
            </a>
          </Link>
        </li>
      )
    })
  }

  return (
    <footer className='footer'>
      <div className='container'>
        <Grid>
          <Cell
            className='footer_colItem-brand' 
            size={3}>
            <Link href='/'>
              <a href="">
                <img 
                  src='/static/img/logo.png' 
                  alt=''
                />
              </a>
            </Link>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing 
              elit. Autem tenetur optio temporibus</p>
          </Cell>
          <Cell 
            className='footer_colItem footer_colItem-information'
            size={3}>
            <h1 className='footer_colItem_header'>Information</h1>
            <ul className='footer_colItem_menu'>
              { renderMenu() }
            </ul>
          </Cell>
          <Cell 
            className='footer_colItem footer_colItem-other'
            size={3}>
            <h1 className='footer_colItem_header'>Other</h1>
            <ul className='footer_colItem_menu'>
              { renderMenu() }
            </ul>
          </Cell>
          <Cell 
            className='footer_colItem footer_colItem-contact'
            size={3}>
            <h1 className='footer_colItem_header'>Contact</h1>
            <p>
              <FontIcon>place</FontIcon>
              <div className='value'>
                <p>Sample Place , sample</p>
                <p>Cebu, Philippines</p>
                <p>6000</p>
              </div>
            </p>
            <p>
              <FontIcon>local_phone</FontIcon>
              <div className='value'>
                <p>+32 230 - 1234</p>
                <p>+32 914 123 - 1234</p>
              </div>
            </p>
          </Cell>
        </Grid>
      </div>
    </footer>
  )
}



