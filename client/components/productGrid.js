import React from 'react'
import {styles} from './display-many-products'
import {Link} from 'react-router-dom'

import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const handleClick = (product, orderId, addItemToCart) => {
  const reqBodyObj = {
    orderId: orderId,
    productId: Number(product.id)
  }
  if (orderId) {
    return addItemToCart(reqBodyObj)
  } else {
    const curCart = JSON.parse(window.localStorage.getItem('cart'))
    curCart.push(product)
    window.localStorage.setItem('cart', JSON.stringify(curCart))
}
}

const ProductGrid = props => {
  const product = props.product
  return (
    <div className={styles.gridList}>
      <GridListTile key={product.title}>
        <img src={product.imgUrl} alt={product.title} style={{height: '200px', width: '200px', border: '8px solid white'}} />
        <GridListTileBar
          title={<Link to={`/product/${product.id}`}>{product.title}</Link>}
          subtitle={<span>{product.description}</span>}
          actionIcon={
            <IconButton className={styles.icon}>
              <ShoppingCartIcon onClick ={() => handleClick(product, props.orderId, props.cartItems, props.addItemToCart, props.addToCartNLI, props.setCartState)}/>
            </IconButton>
          }
        />
      </GridListTile>
    </div>
  )
}
export default ProductGrid
