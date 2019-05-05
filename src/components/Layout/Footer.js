import React from 'react'
import Grid from 'react-md/lib/Grids/Grid'
import Cell from 'react-md/lib/Grids/Cell'
import FontIcon from 'react-md/lib/FontIcons/FontIcon'
import Link from 'next/link';

import 'sass/components/footer/index.scss'


export default function Footer(){

  const information_menu = [
    {
      name: 'About Us',
      link: '/#'
    },
    {
      name: 'Contact Us',
      link: '/#'
    },
    {
      name: 'Privacy Policy',
      link: '/#'
    },
    {
      name: 'Terms & Conditions',
      link: '/#'
    }
  ]

  const interns_menu = [
    {
      name: 'Create Account',
      link: '/signup'
    },
    {
      name: 'FAQ',
      link: '/#'
    }
  ]


  const renderMenu = () => {
    return information_menu.map(({name, link}, index) => {
      return (
        <li key={index} className='footer_colItem_menu_item'>
          <Link href={link}>
            <a>
              {name}
            </a>
          </Link>
        </li>
      )
    })
  }

  const renderInterns = () => {
    return interns_menu.map(({name, link}, index) => {
      return (
        <li key={index} className='footer_colItem_menu_item'>
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
            <p>Find the right internship for you anywhere in the Philippines!</p>
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
            <h1 className='footer_colItem_header'>Interns</h1>
            <ul className='footer_colItem_menu'>
              { renderInterns() }
            </ul>
          </Cell>
          <Cell 
            className='footer_colItem footer_colItem-contact'
            size={3}>
            <h1 className='footer_colItem_header'>Contact</h1>
            <div>
              <FontIcon>place</FontIcon>
              <div className='value'>
                <p>Gorordo Avenue, Lahug, Cebu City</p>
                <p>Cebu, Philippines</p>
                <p>6000</p>
              </div>
            </div>
            <div>
              <FontIcon>local_phone</FontIcon>
              <div className='value'>
                <p>+63 977-826-9012</p>
              </div>
            </div>
            <div>
              <FontIcon>email</FontIcon>
              <div className='value'>
                <p>internlinksupport@gmail.com</p>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    </footer>
  )
}



