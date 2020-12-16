import React from "react"
import AppBar from "@material-ui/core/AppBar"
import { IconButton, Toolbar, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';


const NavBar = () => {
  return (
      <AppBar  position="absolute" color="inherit">
        <Toolbar>
            <Link to="/">
            <IconButton>
                <HomeIcon />
            </IconButton>
            </Link>
            <a href="https://kyselypalvelu-backend.herokuapp.com/newquestionnaire">
                <Typography variant="h6">
                    Luo uusi kysely
                </Typography>
            </a>
        </Toolbar>
      </AppBar>
  )
}

export default NavBar