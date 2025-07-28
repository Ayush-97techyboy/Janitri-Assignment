import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styles from './Header.module.scss'

const Header = ({ onMenuClick }) => {
  return (
    <AppBar position="fixed" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Optional title or empty */}
        </Typography>
        <div className={styles.certifiedLogoContainer}>
          <img
            src="/src/assets/Images/NAT Health Certified.png"
            alt="NAT Health Certified"
            className={styles.certifiedLogo}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
