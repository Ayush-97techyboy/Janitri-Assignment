import React from 'react'
import { NavLink } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DevicesIcon from '@mui/icons-material/Devices'
import BuildIcon from '@mui/icons-material/Build'
import EventNoteIcon from '@mui/icons-material/EventNote'
import NotificationsIcon from '@mui/icons-material/Notifications'
import styles from './Sidebar.module.scss'

const menuItems = [
  { text: 'Device Inventory', path: '/', icon: <DevicesIcon /> },
  { text: 'Installation & Training', path: '/installation-training', icon: <BuildIcon /> },
  { text: 'Service Visits', path: '/service-visits', icon: <EventNoteIcon /> },
  { text: 'AMC/CMC Tracker', path: '/amc-tracker', icon: <DashboardIcon /> },
  { text: 'Alerts & Photo Logs', path: '/alerts-photo-logs', icon: <NotificationsIcon /> },
]

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      classes={{ paper: styles.drawerPaper }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={styles.logoContainer}>
        <img
          src="/src/assets/Images/Janitri Logo.png"
          alt="Janitri Logo"
          className={styles.sidebarLogo}
        />
      </div>
      <List>
        {menuItems.map(({ text, path, icon }) => (
          <ListItem
            key={text}
            component={NavLink}
            to={path}
            onClick={onClose}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
