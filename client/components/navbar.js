import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import {getAllCategories} from '../store/product'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Animated} from "react-animated-css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const defaultState = {
  search: '',
  anchorEl: null,
  anchorEl2: null
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleClick(evt) {
    this.setState({anchorEl: evt.currentTarget})
  }

  handleClick2(evt) {
    this.setState({anchorEl2: evt.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  handleClose2 = () => {
    this.setState({anchorEl2: null})
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const classes = this.props.classes
    const {anchorEl, anchorEl2} = this.state
    const categories = this.props.categories
    const userId = this.props.user.id
    return (
      <div>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <a href="/home"><img src="images/logo_banner.png" height="300px" width="100%" padding-top="0px"/></a>
        </Animated>
        <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  {this.props.isLoggedIn ? (
                      <div>
                      <Button  href="/home" color="secondary">Home</Button>
                      <Button onClick={this.props.handleClick} color="secondary">Logout</Button>
                      </div>
                  ) : (
                    <div>
                      {/* The navbar will show these links before you log in */}
                        <Button href ="/login" color="secondary">Login</Button>
                        <Button href="signup" color="secondary">Sign Up</Button>  
                    </div>
                  )}
                  <Button href="/product">Products</Button>{' '}
                  <Button aria-owns={anchorEl2 ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick2}>
                    Categories 
                  </Button>
                  <Menu id="simple-menu" anchorEl={anchorEl2} open={Boolean(anchorEl2)} onClose={this.handleClose2}>
                    {categories.map(category => {
                      return (
                        <NavLink
                          key={category.id}
                          to={`/product/category/${category.title}`}
                        >
                          <MenuItem onClick={this.handleClose2}>
                            {category.title}
                          </MenuItem>
                        </NavLink>
                      )
                    })}
                  </Menu>
                </Typography>
                <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon/>
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      name = "search"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.search}
                    />
                  </div>
                    <Button href={{pathname: '/search', state: {searchTerm: this.state.search}}} type="submit" onClick={() => this.setState(defaultState)}> Go </Button>
                <NavLink to="/cart">
                  <IconButton>
                    <ShoppingCartIcon />
                  </IconButton>
                </NavLink>
              </Toolbar>
            </AppBar>
          </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    categories: state.product.categories,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCategories: () => dispatch(getAllCategories()),
    handleClick() {
      dispatch(logout())
    }
  }
}

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar));


{/* <Button
props="user"
color="primary"
aria-owns={anchorEl ? 'simple-menu' : null}
aria-haspopup="true"
onClick={this.handleClick}
>
<h2>{this.props.user.firstName}</h2>
</Button>
<Menu
id="simple-menu"
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={this.handleClose}
>
<NavLink to={`/users/profile/${userId}`}>
  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
</NavLink>
<MenuItem onClick={this.handleClose}>My Orders</MenuItem>
</Menu> */}